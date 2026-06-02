import type { PartnerListResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function fetchPartnersOnClient(): Promise<
  ApiEnvelope<PartnerListResponse | undefined>
> {
  const response = await fetch("/api/partners", { method: "GET" });
  const result = (await response.json()) as ApiEnvelope<
    PartnerListResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to fetch partners." : result.error.message,
    );
  }

  return result;
}
