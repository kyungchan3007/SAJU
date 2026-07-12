"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchMyMembershipsOnClient } from "@/entities/community/client/fetchMyMembershipsOnClient";
import { COMMUNITY_MEMBERSHIPS_QUERY_KEY } from "@/entities/community/model/query";
import { getLatestCommunityMembership } from "@/features/community/model/community-application";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";

// 마이페이지 "내 신청"은 활성 상태만이 아니라 최신 신청 상태를 보여준다.
// 취소 훅과 같은 쿼리 키를 써서 취소 성공 시 invalidate가 이 조회에도 반영되도록 한다.
export function useMyCommunityApplication() {
  const authScope = useAuthScope();

  const query = useQuery({
    queryKey: [...COMMUNITY_MEMBERSHIPS_QUERY_KEY, authScope],
    queryFn: fetchMyMembershipsOnClient,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });

  const memberships = query.data?.success ? query.data.data : undefined;

  return {
    isLoading: query.isLoading,
    isError: query.isError || (Boolean(query.data) && !query.data?.success),
    membership: getLatestCommunityMembership(memberships),
  };
}
