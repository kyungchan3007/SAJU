"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/saju-profile/model/query";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { toMypageSajuSummaryItems } from "../../model/sajuSummary";
import type { MypageUser } from "../../type/types";
import { MypageProfileCard } from "./mypage-profile-card";
import { MypageSajuSummary } from "./mypage-saju-summary";

export function MypageSidebar({ user }: { user: MypageUser }) {
  const authScope = useAuthScope();
  const query = useQuery({
    queryKey: [...SAJU_PROFILE_QUERY_KEY, authScope],
    queryFn: fetchSajuProfileOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });
  const items = toMypageSajuSummaryItems(
    query.data?.success ? query.data.data?.sajuAnalysis : undefined,
  );

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24">
      <MypageProfileCard user={user} />
      <MypageSajuSummary items={items} />
    </div>
  );
}
