import type { TraditionalFortuneResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { SAJU_TRADITIONAL_FORTUNE_BFF_PATH } from "@/shared/config/endPoint";

export async function fetchTraditionalFortuneOnClient(): Promise<
  ApiEnvelope<TraditionalFortuneResponse | undefined>
> {
  const response = await fetch(SAJU_TRADITIONAL_FORTUNE_BFF_PATH, {
    method: "GET",
  });

  const result = (await response.json()) as ApiEnvelope<
    TraditionalFortuneResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success
        ? "Failed to fetch traditional fortune."
        : result.error.message,
    );
  }

  return result;
}
