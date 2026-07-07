import type { SajuRequest, SajuResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { SAJU_ME_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function updateSajuProfileOnClient(
  payload: SajuRequest,
): Promise<ApiEnvelope<SajuResponse | undefined>> {
  const response = await fetch(SAJU_ME_ENDPOINT_PATH, {
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
