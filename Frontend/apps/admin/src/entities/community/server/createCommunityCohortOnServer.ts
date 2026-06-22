import "server-only";

import type {
  CommunityCohortCreateRequest,
  CommunityCohortCreateResponse,
} from "@/features/community-cohort/type/types";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { ADMIN_COMMUNITY_COHORT_ENDPOINT_PATH } from "@/shared/config/endPoint";

type Result =
  | { success: true; data: CommunityCohortCreateResponse | undefined }
  | { success: false; status: number; message: string };

export async function createCommunityCohortOnServer(
  body: CommunityCohortCreateRequest,
): Promise<Result> {
  const result = await authenticatedBackendFetch(
    ADMIN_COMMUNITY_COHORT_ENDPOINT_PATH,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );

  return parseBackendApiResponse<CommunityCohortCreateResponse>(
    result.response,
    "Create community cohort request failed.",
  );
}
