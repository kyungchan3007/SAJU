import type { SajuResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { ApiRequestError } from "@/shared/api/requestError";

export async function fetchSajuTraditionalOnClient(): Promise<
  ApiEnvelope<SajuResponse | undefined>
> {
  const response = await fetch("/api/saju/traditional", { method: "GET" });
  const result = (await response.json()) as ApiEnvelope<
    SajuResponse | undefined
  >;

  if (!response.ok) {
    throw new ApiRequestError(
      result.success ? "Failed to fetch traditional saju." : result.error.message,
      result.success ? "SAJU_TRADITIONAL_GET_FAILED" : result.error.code,
      response.status,
    );
  }

  return result;
}
