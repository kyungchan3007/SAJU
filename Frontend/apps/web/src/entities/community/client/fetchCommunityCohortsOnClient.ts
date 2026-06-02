import type { CommunityCohortStatusResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function fetchCommunityCohortsOnClient(): Promise<
  ApiEnvelope<CommunityCohortStatusResponse[] | undefined>
> {
  const response = await fetch("/api/community/cohorts", { method: "GET" });
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
