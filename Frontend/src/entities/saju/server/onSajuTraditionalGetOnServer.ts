import type { SajuResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_TRADITIONAL_ENDPOINT_PATH } from "@/shared/config/endPoint";

type SajuTraditionalGetSuccess = {
  success: true;
  data: SajuResponse | undefined;
};

type SajuTraditionalGetFailure = {
  success: false;
  status: number;
  message: string;
};

export type SajuTraditionalGetResult =
  | SajuTraditionalGetSuccess
  | SajuTraditionalGetFailure;

export async function onSajuTraditionalGetOnServer(): Promise<SajuTraditionalGetResult> {
  const result = await authenticatedBackendFetch(
    SAJU_TRADITIONAL_ENDPOINT_PATH,
    { method: "GET" },
  );

  const parsed = await parseBackendApiResponse<SajuResponse>(
    result.response,
    "Traditional saju request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
