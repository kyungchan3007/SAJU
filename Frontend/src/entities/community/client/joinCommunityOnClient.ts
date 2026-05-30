import type { CommunityJoinRequest, CommunityJoinResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function joinCommunityOnClient(
  payload: CommunityJoinRequest,
): Promise<ApiEnvelope<CommunityJoinResponse | undefined>> {
  const response = await fetch("/api/community/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = (await response.json()) as ApiEnvelope<
    CommunityJoinResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to join community." : result.error.message,
    );
  }

  return result;
}
