import type { SajuRequest, SajuResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function updateSajuProfileOnClient(
  payload: SajuRequest,
): Promise<ApiEnvelope<SajuResponse | undefined>> {
  const response = await fetch("/api/saju/me", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as ApiEnvelope<
    SajuResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to update saju profile." : result.error.message,
    );
  }

  return result;
}
