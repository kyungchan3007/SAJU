import type { CancelMembershipRequest } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { ApiRequestError } from "@/shared/api/requestError";
import { COMMUNITY_CANCEL_BFF_PATH } from "@/shared/config/endPoint";

export async function cancelCommunityMembershipOnClient(
  payload: CancelMembershipRequest,
): Promise<ApiEnvelope<unknown>> {
  const response = await fetch(COMMUNITY_CANCEL_BFF_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = (await response.json()) as ApiEnvelope<unknown>;

  if (!response.ok) {
    throw new ApiRequestError(
      result.success
        ? "Failed to cancel community membership."
        : result.error.message,
      result.success ? "COMMUNITY_CANCEL_FAILED" : result.error.code,
      response.status,
    );
  }

  return result;
}
