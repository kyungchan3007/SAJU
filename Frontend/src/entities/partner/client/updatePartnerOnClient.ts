import type { PartnerRequest, PartnerResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function updatePartnerOnClient(
  partnerId: number,
  payload: PartnerRequest,
): Promise<ApiEnvelope<PartnerResponse | undefined>> {
  const response = await fetch(`/api/partners/${partnerId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as ApiEnvelope<
    PartnerResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to update partner." : result.error.message,
    );
  }

  return result;
}
