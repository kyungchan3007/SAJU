import type { SajuFormValues } from "@/features/saju-input/type/type";
import type { DailyEnergyResponse, SajuCreateRequest } from "@/generated/api";
import { normalizeDailyEnergyResponse } from "@/entities/saju/server/normalizeDailyEnergyResponse";
import {
  authenticatedBackendFetch,
  type AuthenticatedBackendFetchOptions,
} from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_ENDPOINT_PATH } from "@/shared/config/endPoint";
import {
  isSajuCalendarInputType,
  toBackendSajuCalendarType,
} from "@/shared/model/saju-calendar/utils";
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
  authOptions?: AuthenticatedBackendFetchOptions,
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
    !isSajuCalendarInputType(formValues.calendarType)
  ) {
    return {
      success: false,
      status: 400,
      message: "Saju request values are invalid.",
    };
  }

  const payload: SajuCreateRequest = {
    birthTime: formValues.birthTime || null,
    gender: formValues.gender,
    calendarType: toBackendSajuCalendarType(formValues.calendarType),
    birthDate,
    city: formValues.city || null,
    termsConsent: formValues.agreedToTerms,
    privacyConsent: formValues.agreedToPrivacy,
  };

  const result = await authenticatedBackendFetch(
    SAJU_ENDPOINT_PATH,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
    authOptions,
  );
  const parsed = await parseBackendApiResponse<DailyEnergyResponse>(
    result.response,
    "Saju request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return {
    success: true,
    data: normalizeDailyEnergyResponse(parsed.data),
  };
}

function isSajuGender(value: string): value is SajuCreateRequest["gender"] {
  return value === "MALE" || value === "FEMALE";
}
