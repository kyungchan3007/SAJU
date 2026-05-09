import type { SajuResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function fetchSajuTraditionalOnClient(): Promise<
  ApiEnvelope<SajuResponse | undefined>
> {
  const response = await fetch("/api/saju/traditional", { method: "GET" });
  const result = (await response.json()) as ApiEnvelope<
    SajuResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to fetch traditional saju." : result.error.message,
    );
  }

  return result;
}
