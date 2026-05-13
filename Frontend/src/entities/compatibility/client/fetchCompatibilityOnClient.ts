import type { CompatibilityResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function fetchCompatibilityOnClient(
  partnerId: number,
): Promise<ApiEnvelope<CompatibilityResponse | undefined>> {
  const response = await fetch(
    `/api/saju/me/compatibility/${partnerId}`,
    { method: "GET" },
  );

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
