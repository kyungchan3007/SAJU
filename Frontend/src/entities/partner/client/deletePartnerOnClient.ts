import type { ApiEnvelope } from "@/shared/api";

export async function deletePartnerOnClient(
  partnerId: number,
): Promise<ApiEnvelope<{ deleted: boolean } | undefined>> {
  const response = await fetch(`/api/partners/${partnerId}`, {
    method: "DELETE",
  });

  const result = (await response.json()) as ApiEnvelope<
    { deleted: boolean } | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to delete partner." : result.error.message,
    );
  }

  return result;
}
