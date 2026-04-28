import type { SajuFormValues } from "@/features/saju-input/type/type";
import { getServerEnv } from "@/shared/config";
import { SAJU_ENDPOINT_PATH } from "@/shared/config/endPoint";
import { toBackendBirthDate } from "@/shared/utils/BirthDate";

type SajuPostSuccess = {
  success: true;
  data: unknown;
};

type SajuPostFailure = {
  success: false;
  status: number;
  message: string;
};

type SajuPostResult = SajuPostSuccess | SajuPostFailure;

type BackendApiResponse = {
  message?: string;
  data?: unknown;
};

export async function onSajuPostOnServer(
  formValues: SajuFormValues,
  accessToken: string,
): Promise<SajuPostResult> {
  const { BACKEND_API_BASE_URL } = getServerEnv();

  const url = `${BACKEND_API_BASE_URL}${SAJU_ENDPOINT_PATH}`;

  if (!BACKEND_API_BASE_URL) {
    return {
      success: false,
      status: 500,
      message: "BACKEND_API_BASE_URL is not configured.",
    };
  }

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

  const payload = {
    birthTime: formValues?.birthTime,
    gender: formValues?.gender,
    calendarType: formValues?.calendarType,
    birthDate,
    city: formValues?.city,
  };
  console.log(payload, "payload");
  const response = await fetch(`${BACKEND_API_BASE_URL}${SAJU_ENDPOINT_PATH}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });
  const rawText = await response.text();
  console.log(response.status, rawText, "saju raw response");
  let body: BackendApiResponse | null = null;

  try {
    body = (await response.json()) as BackendApiResponse;
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
    data: body?.data ?? body,
  };
}
