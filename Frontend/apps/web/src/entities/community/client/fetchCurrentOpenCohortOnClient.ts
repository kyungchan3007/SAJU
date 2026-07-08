import type { CurrentCohortResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { ApiRequestError } from "@/shared/api/requestError";
import { COMMUNITY_CURRENT_COHORT_BFF_PATH } from "@/shared/config/endPoint";

export async function fetchCurrentOpenCohortOnClient(): Promise<
  ApiEnvelope<CurrentCohortResponse | undefined>
> {
  const response = await fetch(COMMUNITY_CURRENT_COHORT_BFF_PATH, {
    method: "GET",
  });
  const result = (await response.json()) as ApiEnvelope<
    CurrentCohortResponse | undefined
  >;

  if (!response.ok) {
    throw new ApiRequestError(
      result.success
        ? "Failed to fetch current open cohort."
        : result.error.message,
      result.success ? "COMMUNITY_CURRENT_COHORT_GET_FAILED" : result.error.code,
      response.status,
    );
  }

  return result;
}
