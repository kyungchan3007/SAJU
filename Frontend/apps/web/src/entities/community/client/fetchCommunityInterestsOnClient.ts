import type { CommunityInterestResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { COMMUNITY_INTERESTS_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function fetchCommunityInterestsOnClient(): Promise<
  ApiEnvelope<CommunityInterestResponse[] | undefined>
> {
  const response = await fetch(COMMUNITY_INTERESTS_ENDPOINT_PATH, {
    method: "GET",
  });
  const result = (await response.json()) as ApiEnvelope<
    CommunityInterestResponse[] | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success
        ? "Failed to fetch community interests."
        : result.error.message,
    );
  }

  return result;
}
