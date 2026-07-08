import type { CommunityJoinResponse } from "@/generated/api";
import type { CommunityJoinClientPayload } from "@/entities/community/model/joinPayload";
import type { ApiEnvelope } from "@/shared/api";
import { ApiRequestError } from "@/shared/api/requestError";
import { COMMUNITY_JOIN_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function joinCommunityOnClient(
  payload: CommunityJoinClientPayload,
): Promise<ApiEnvelope<CommunityJoinResponse | undefined>> {
  const response = await fetch(COMMUNITY_JOIN_ENDPOINT_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = (await response.json()) as ApiEnvelope<
    CommunityJoinResponse | undefined
  >;

  if (!response.ok) {
    throw new ApiRequestError(
      result.success ? "Failed to join community." : result.error.message,
      result.success ? "COMMUNITY_JOIN_FAILED" : result.error.code,
      response.status,
    );
  }

  return result;
}
