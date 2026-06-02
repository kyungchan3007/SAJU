import "server-only";

import type { CommunityCohortStatusResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { COMMUNITY_COHORTS_ENDPOINT_PATH } from "@/shared/config/endPoint";

type GetCommunityCohortsOnServerSuccess = {
  success: true;
  data: CommunityCohortStatusResponse[] | undefined;
};

type GetCommunityCohortsOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetCommunityCohortsOnServerResult =
  | GetCommunityCohortsOnServerSuccess
  | GetCommunityCohortsOnServerFailure;

export async function getCommunityCohortsOnServer(): Promise<GetCommunityCohortsOnServerResult> {
  const result = await authenticatedBackendFetch(COMMUNITY_COHORTS_ENDPOINT_PATH, {
    method: "GET",
  });

  const parsed = await parseBackendApiResponse<CommunityCohortStatusResponse[]>(
    result.response,
    "Get community cohorts request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
