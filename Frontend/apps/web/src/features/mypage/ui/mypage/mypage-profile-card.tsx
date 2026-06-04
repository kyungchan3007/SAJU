"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { findZodiacByLabel } from "@/shared/model/zodiac/utils";
import { SAJU_PROFILE_QUERY_KEY } from "../../hooks/useSajuManage";
import type { MypageUser } from "../../type/types";
import { MypageProfileCardView } from "./mypage-profile-card.view";

type Props = { user: MypageUser };

export function MypageProfileCard({ user }: Props) {
  const authScope = useAuthScope();
  const { data } = useQuery({
    queryKey: [...SAJU_PROFILE_QUERY_KEY, authScope],
    queryFn: fetchSajuProfileOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });

  const summaryZodiac = data?.success
    ? ((data.data as { summaryZodiac?: string | null } | undefined)
        ?.summaryZodiac ?? user.summaryZodiac)
    : user.summaryZodiac;
  const zodiac = findZodiacByLabel(summaryZodiac);
  const isCommunityJoined = Boolean(data?.success && data.data?.communityJoined);

  return (
    <MypageProfileCardView
      email={user.email}
      zodiacEmoji={zodiac?.emoji}
      isCommunityJoined={isCommunityJoined}
    />
  );
}
