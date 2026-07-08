import "server-only";

import type { MyMembershipResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { COMMUNITY_MEMBERS_ME_ENDPOINT_PATH } from "@/shared/config/endPoint";

type GetMyMembershipsOnServerSuccess = {
  success: true;
  data: MyMembershipResponse[] | undefined;
};

type GetMyMembershipsOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetMyMembershipsOnServerResult =
  | GetMyMembershipsOnServerSuccess
  | GetMyMembershipsOnServerFailure;

export async function getMyMembershipsOnServer(): Promise<GetMyMembershipsOnServerResult> {
  const result = await authenticatedBackendFetch(
    COMMUNITY_MEMBERS_ME_ENDPOINT_PATH,
    {
      method: "GET",
    },
  );

  const parsed = await parseBackendApiResponse<MyMembershipResponse[]>(
    result.response,
    "Get my community memberships request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
