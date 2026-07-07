import type { YearFortuneResponse } from "@/generated/api";
import type { GeneratedInterpretationMeta } from "@/shared/api/backend/parseGeneratedInterpretationResponse";
import type { ApiEnvelope } from "@/shared/api";
import { ApiRequestError } from "@/shared/api/requestError";
import { SAJU_YEAR_FORTUNE_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function fetchYearFortuneOnClient(): Promise<
  ApiEnvelope<YearFortuneResponse | undefined, GeneratedInterpretationMeta>
> {
  const response = await fetch(SAJU_YEAR_FORTUNE_ENDPOINT_PATH, {
    method: "GET",
  });

  const result = (await response.json()) as ApiEnvelope<
    YearFortuneResponse | undefined,
    GeneratedInterpretationMeta
  >;

  if (!response.ok) {
    throw new ApiRequestError(
      result.success
        ? "Failed to fetch year fortune."
        : result.error.message,
      result.success ? "YEAR_FORTUNE_GET_FAILED" : result.error.code,
      response.status,
    );
  }

  return result;
}
