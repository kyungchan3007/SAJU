import type { CompatibilityResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { getSajuCompatibilityPath } from "@/shared/config/endPoint";

export async function fetchCompatibilityOnClient(
  partnerId: number,
): Promise<ApiEnvelope<CompatibilityResponse | undefined>> {
  const response = await fetch(getSajuCompatibilityPath(partnerId), {
    method: "GET",
  });

  const result = (await response.json()) as ApiEnvelope<
    CompatibilityResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success
        ? "Failed to fetch compatibility."
        : result.error.message,
    );
  }

  return result;
}
