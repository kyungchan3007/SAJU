"use client";

import { useMyProfile } from "../hooks/useMyProfile";
import { MYPAGE_DEFAULT_STATS } from "../model/model";
import { MypageProfileCard } from "./mypage-profile-card";
import { MypageStatsCard } from "./mypage-stats-card";

export function MypageSidebar() {
  const { data } = useMyProfile();
  const email = data?.success ? (data.data?.email ?? "회원") : "회원";
  const summaryZodiac = data?.success ? (data.data?.summaryZodiac ?? "") : "";
  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24">
      <MypageProfileCard user={{ email, summaryZodiac }} />
      <MypageStatsCard stats={MYPAGE_DEFAULT_STATS} />
    </div>
  );
}
