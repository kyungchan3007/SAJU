import type { ApiEnvelope } from "@/shared/api";
import { ApiRequestError } from "@/shared/api/requestError";
import { COMMUNITY_MEMBERS_ME_BFF_PATH } from "@/shared/config/endPoint";
import type { MyMembershipResponse } from "@/generated/api";

export async function fetchMyMembershipsOnClient(): Promise<
  ApiEnvelope<MyMembershipResponse[] | undefined>
> {
  const response = await fetch(COMMUNITY_MEMBERS_ME_BFF_PATH, {
    method: "GET",
  });
  const result =
    (await response.json()) as ApiEnvelope<MyMembershipResponse[] | undefined>;

  if (!response.ok) {
    throw new ApiRequestError(
      result.success
        ? "Failed to fetch community memberships."
        : result.error.message,
      result.success ? "COMMUNITY_MEMBERSHIPS_GET_FAILED" : result.error.code,
      response.status,
    );
  }

  return result;
}
