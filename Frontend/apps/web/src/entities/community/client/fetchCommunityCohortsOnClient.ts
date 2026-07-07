import type { CommunityCohortStatusResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { COMMUNITY_COHORTS_BFF_PATH } from "@/shared/config/endPoint";

export async function fetchCommunityCohortsOnClient(): Promise<
  ApiEnvelope<CommunityCohortStatusResponse[] | undefined>
> {
  const response = await fetch(COMMUNITY_COHORTS_BFF_PATH, { method: "GET" });
  const result = (await response.json()) as ApiEnvelope<
    CommunityCohortStatusResponse[] | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success
        ? "Failed to fetch community cohorts."
        : result.error.message,
    );
  }

  return result;
}
