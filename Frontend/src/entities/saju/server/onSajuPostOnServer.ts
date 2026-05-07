import type { SajuFormValues } from "@/features/saju-input/type/type";
import type {
  ApiResponseDailyEnergyResponse,
  DailyEnergyResponse,
  SajuRequest,
} from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { SAJU_ENDPOINT_PATH } from "@/shared/config/endPoint";
import { toBackendBirthDate } from "@/shared/utils/BirthDate";

type SajuPostSuccess = {
  success: true;
  data: DailyEnergyResponse | undefined;
};

type SajuPostFailure = {
  success: false;
  status: number;
  message: string;
};

type SajuPostResult = SajuPostSuccess | SajuPostFailure;

export async function onSajuPostOnServer(
  formValues: SajuFormValues,
): Promise<SajuPostResult> {
  const birthDate = toBackendBirthDate(
    formValues.birthYear,
    formValues.birthDate,
  );

  if (!birthDate) {
    return {
      success: false,
      status: 400,
      message: "Birth date format is invalid.",
    };
  }

  if (
    !isSajuGender(formValues.gender) ||
    !isSajuCalendarType(formValues.calendarType)
  ) {
    return {
      success: false,
      status: 400,
      message: "Saju request values are invalid.",
    };
  }

  const payload: SajuRequest = {
    birthTime: formValues.birthTime || null,
    gender: formValues.gender,
    calendarType: formValues.calendarType,
    birthDate,
    city: formValues.city || null,
  };

  const result = await authenticatedBackendFetch(SAJU_ENDPOINT_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const response = result.response;

  let body: ApiResponseDailyEnergyResponse | null = null;

  try {
    body = (await response.json()) as ApiResponseDailyEnergyResponse;
  } catch {
    body = null;
  }

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      message: body?.message ?? `Saju request failed (${response.status}).`,
    };
  }

  return {
    success: true,
    data: body?.data,
  };
}

function isSajuGender(value: string): value is SajuRequest["gender"] {
  return value === "MALE" || value === "FEMALE";
}

function isSajuCalendarType(
  value: string,
): value is SajuRequest["calendarType"] {
  return value === "SOLAR" || value === "LUNAR";
}
