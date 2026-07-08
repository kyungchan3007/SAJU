import "server-only";

import type { CurrentCohortResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { COMMUNITY_CURRENT_COHORT_ENDPOINT_PATH } from "@/shared/config/endPoint";

type GetCurrentOpenCohortOnServerSuccess = {
  success: true;
  data: CurrentCohortResponse | undefined;
};

type GetCurrentOpenCohortOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetCurrentOpenCohortOnServerResult =
  | GetCurrentOpenCohortOnServerSuccess
  | GetCurrentOpenCohortOnServerFailure;

export async function getCurrentOpenCohortOnServer(): Promise<GetCurrentOpenCohortOnServerResult> {
  const result = await authenticatedBackendFetch(
    COMMUNITY_CURRENT_COHORT_ENDPOINT_PATH,
    {
      method: "GET",
    },
  );

  const parsed = await parseBackendApiResponse<CurrentCohortResponse>(
    result.response,
    "Get current open cohort request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
