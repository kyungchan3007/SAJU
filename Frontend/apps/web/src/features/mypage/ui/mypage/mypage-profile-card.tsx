"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import { findZodiacByLabel } from "@/shared/model/zodiac/utils";
import type { MypageUser } from "../../type/types";
import { MypageProfileCardView } from "./mypage-profile-card.view";

type Props = { user: MypageUser };

const SAJU_PROFILE_CARD_QUERY_KEY = ["saju-profile", "mypage-profile-card"] as const;

export function MypageProfileCard({ user }: Props) {
  const { data } = useQuery({
    queryKey: SAJU_PROFILE_CARD_QUERY_KEY,
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
