import type { CommunityCohortStatus } from "@/features/community-cohort/type/types";
import { ADMIN_COMMUNITY_COHORTS_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function fetchCommunityCohortsOnClient(): Promise<
  CommunityCohortStatus[]
> {
  const res = await fetch(ADMIN_COMMUNITY_COHORTS_ENDPOINT_PATH, {
    method: "GET",
  });
  const body = (await res.json()) as {
    success: boolean;
    data?: CommunityCohortStatus[];
    message?: string;
  };

  if (!res.ok || !body.success) {
    throw new Error(body.message ?? "기수 목록 조회 실패");
  }

  return body.data ?? [];
}
