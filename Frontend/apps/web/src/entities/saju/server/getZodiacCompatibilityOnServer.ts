import type { ZodiacCompatibilityResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_ZODIAC_COMPATIBILITY_ENDPOINT_PATH } from "@/shared/config/endPoint";

type ZodiacCompatibilityGetSuccess = {
  success: true;
  data: ZodiacCompatibilityResponse | undefined;
};

type ZodiacCompatibilityGetFailure = {
  success: false;
  status: number;
  message: string;
};

export type ZodiacCompatibilityGetResult =
  | ZodiacCompatibilityGetSuccess
  | ZodiacCompatibilityGetFailure;

export async function getZodiacCompatibilityOnServer(): Promise<ZodiacCompatibilityGetResult> {
  const result = await authenticatedBackendFetch(
    SAJU_ZODIAC_COMPATIBILITY_ENDPOINT_PATH,
    { method: "GET" },
  );

  const parsed = await parseBackendApiResponse<ZodiacCompatibilityResponse>(
    result.response,
    "Zodiac compatibility request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
