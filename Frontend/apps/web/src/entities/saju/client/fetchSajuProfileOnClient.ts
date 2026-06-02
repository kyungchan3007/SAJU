import type { SajuProfileResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function fetchSajuProfileOnClient(): Promise<
  ApiEnvelope<SajuProfileResponse | undefined>
> {
  const response = await fetch("/api/saju/me", { method: "GET" });
  const result = (await response.json()) as ApiEnvelope<
    SajuProfileResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to fetch saju profile." : result.error.message,
    );
  }

  return result;
}
