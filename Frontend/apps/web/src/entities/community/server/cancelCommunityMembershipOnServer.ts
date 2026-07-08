import "server-only";

import type { CancelMembershipRequest } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { COMMUNITY_CANCEL_ENDPOINT_PATH } from "@/shared/config/endPoint";

type CancelCommunityMembershipOnServerSuccess = {
  success: true;
  data: unknown;
};

type CancelCommunityMembershipOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type CancelCommunityMembershipOnServerResult =
  | CancelCommunityMembershipOnServerSuccess
  | CancelCommunityMembershipOnServerFailure;

export async function cancelCommunityMembershipOnServer(
  payload: CancelMembershipRequest,
): Promise<CancelCommunityMembershipOnServerResult> {
  const result = await authenticatedBackendFetch(COMMUNITY_CANCEL_ENDPOINT_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const parsed = await parseBackendApiResponse<unknown>(
    result.response,
    "Cancel community membership request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data ?? null };
}
