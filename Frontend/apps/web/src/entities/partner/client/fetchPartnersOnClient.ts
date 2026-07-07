import type { PartnerListResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { SAJU_PARTNERS_PATH } from "@/shared/config/endPoint";

export async function fetchPartnersOnClient(): Promise<
  ApiEnvelope<PartnerListResponse | undefined>
> {
  const response = await fetch(SAJU_PARTNERS_PATH, { method: "GET" });
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
