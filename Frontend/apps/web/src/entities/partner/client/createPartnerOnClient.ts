import type { PartnerRequest, PartnerResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { SAJU_PARTNERS_PATH } from "@/shared/config/endPoint";

export async function createPartnerOnClient(
  payload: PartnerRequest,
): Promise<ApiEnvelope<PartnerResponse | undefined>> {
  const response = await fetch(SAJU_PARTNERS_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as ApiEnvelope<
    PartnerResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to create partner." : result.error.message,
    );
  }

  return result;
}
