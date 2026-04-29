import { getServerEnv } from "@/shared/config";
import { SAJU_DAILY_ENDPOINT_PATH } from "@/shared/config/endPoint";

type SajuDailyGetSuccess = {
  success: true;
  data: unknown;
};

type SajuDailyGetFailure = {
  success: false;
  status: number;
  message: string;
};

type SajuDailyGetResult = SajuDailyGetSuccess | SajuDailyGetFailure;

type BackendApiResponse = {
  message?: string;
  data?: unknown;
};

export async function onSajuDailyGetOnServer(
  accessToken: string,
): Promise<SajuDailyGetResult> {
  const { BACKEND_API_BASE_URL } = getServerEnv();
  if (!BACKEND_API_BASE_URL) {
    return {
      success: false,
      status: 500,
      message: "BACKEND_API_BASE_URL is not configured.",
    };
  }

  const response = await fetch(`${BACKEND_API_BASE_URL}${SAJU_DAILY_ENDPOINT_PATH}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

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
      message:
        body?.message ?? `Daily saju request failed (${response.status}).`,
    };
  }

  return {
    success: true,
    data: body?.data ?? body,
  };
}
