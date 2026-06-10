import type { YearFortuneResponse } from "@/generated/api";
import type { GeneratedInterpretationMeta } from "@/shared/api/backend/parseGeneratedInterpretationResponse";
import type { ApiEnvelope } from "@/shared/api";

export async function fetchYearFortuneOnClient(): Promise<
  ApiEnvelope<YearFortuneResponse | undefined, GeneratedInterpretationMeta>
> {
  const response = await fetch("/api/saju/me/year", { method: "GET" });

  const result = (await response.json()) as ApiEnvelope<
    YearFortuneResponse | undefined,
    GeneratedInterpretationMeta
  >;

  if (!response.ok) {
    throw new Error(
      result.success
        ? "Failed to fetch year fortune."
        : result.error.message,
    );
  }

  return result;
}
