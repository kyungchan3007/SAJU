import "server-only";

import type { CommunityInterestResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { COMMUNITY_INTERESTS_ENDPOINT_PATH } from "@/shared/config/endPoint";

type GetCommunityInterestsOnServerSuccess = {
  success: true;
  data: CommunityInterestResponse[] | undefined;
};

type GetCommunityInterestsOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetCommunityInterestsOnServerResult =
  | GetCommunityInterestsOnServerSuccess
  | GetCommunityInterestsOnServerFailure;

export async function getCommunityInterestsOnServer(): Promise<GetCommunityInterestsOnServerResult> {
  const result = await authenticatedBackendFetch(COMMUNITY_INTERESTS_ENDPOINT_PATH, {
    method: "GET",
  });

  const parsed = await parseBackendApiResponse<CommunityInterestResponse[]>(
    result.response,
    "Get community interests request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
