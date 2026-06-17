import "server-only";

import type { CommunityCohortStatus } from "@/features/community-cohort/type/types";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { ADMIN_COMMUNITY_COHORTS_ENDPOINT_PATH } from "@/shared/config/endPoint";

type Result =
  | { success: true; data: CommunityCohortStatus[] | undefined }
  | { success: false; status: number; message: string };

export async function getCommunityCohortsOnServer(): Promise<Result> {
  const result = await authenticatedBackendFetch(
    ADMIN_COMMUNITY_COHORTS_ENDPOINT_PATH,
    { method: "GET" },
  );

  return parseBackendApiResponse<CommunityCohortStatus[]>(
    result.response,
    "Get community cohorts request failed.",
  );
}
