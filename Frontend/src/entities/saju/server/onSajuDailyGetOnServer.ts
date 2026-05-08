import { DailyEnergyResponse } from "@/generated/api";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
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

  const parsed = await parseBackendApiResponse<DailyEnergyResponse>(
    result.response,
    "Daily saju request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return {
    success: true,
    data: parsed.data,
  };
}
