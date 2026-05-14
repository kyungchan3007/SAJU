import type { TraditionalFortuneResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_TRADITIONAL_FORTUNE_ENDPOINT_PATH } from "@/shared/config/endPoint";

type SajuTraditionalFortuneGetSuccess = {
  success: true;
  data: TraditionalFortuneResponse | undefined;
};

type SajuTraditionalFortuneGetFailure = {
  success: false;
  status: number;
  message: string;
};

export type SajuTraditionalFortuneGetResult =
  | SajuTraditionalFortuneGetSuccess
  | SajuTraditionalFortuneGetFailure;

export async function onSajuTraditionalFortuneGetOnServer(): Promise<SajuTraditionalFortuneGetResult> {
  const result = await authenticatedBackendFetch(
    SAJU_TRADITIONAL_FORTUNE_ENDPOINT_PATH,
    { method: "GET" },
  );

  const parsed = await parseBackendApiResponse<TraditionalFortuneResponse>(
    result.response,
    "Traditional fortune request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
