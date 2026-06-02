import "server-only";

import type { CommunityJoinRequest, CommunityJoinResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { COMMUNITY_JOIN_ENDPOINT_PATH } from "@/shared/config/endPoint";

type JoinCommunityOnServerSuccess = {
  success: true;
  data: CommunityJoinResponse | undefined;
};

type JoinCommunityOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type JoinCommunityOnServerResult =
  | JoinCommunityOnServerSuccess
  | JoinCommunityOnServerFailure;

export async function joinCommunityOnServer(
  payload: CommunityJoinRequest,
): Promise<JoinCommunityOnServerResult> {
  const result = await authenticatedBackendFetch(COMMUNITY_JOIN_ENDPOINT_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const parsed = await parseBackendApiResponse<CommunityJoinResponse>(
    result.response,
    "Join community request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
