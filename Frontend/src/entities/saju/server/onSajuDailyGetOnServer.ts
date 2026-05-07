import {
  ApiResponseDailyEnergyResponse,
  DailyEnergyResponse,
} from "@/generated/api";
import { SAJU_DAILY_ENDPOINT_PATH } from "@/shared/config/endPoint";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";

type SajuDailyGetSuccess = {
  success: true;
  data: DailyEnergyResponse | undefined;
};

type SajuDailyGetFailure = {
  success: false;
  status: number;
  message: string;
};

type SajuDailyGetResult = SajuDailyGetSuccess | SajuDailyGetFailure;

export async function onSajuDailyGetOnServer(): Promise<SajuDailyGetResult> {
  const result = await authenticatedBackendFetch(SAJU_DAILY_ENDPOINT_PATH, {
    method: "GET",
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
      message:
        body?.message ?? `Daily saju request failed (${response.status}).`,
    };
  }

  return {
    success: true,
    data: body?.data,
  };
}
