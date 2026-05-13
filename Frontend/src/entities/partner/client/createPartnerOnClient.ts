import type { PartnerRequest, PartnerResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function createPartnerOnClient(
  payload: PartnerRequest,
): Promise<ApiEnvelope<PartnerResponse | undefined>> {
  const response = await fetch("/api/partners", {
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
