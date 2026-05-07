"use client";

import {
  MypageProfileCard,
  MypageStatsCard,
  MypageBanner,
  MypageNavMenu,
  MypageManagement,
  MypageInfo,
  MYPAGE_BANNERS,
  MYPAGE_DEFAULT_STATS,
  MYPAGE_INFO_ITEMS,
  MYPAGE_MANAGEMENT_ITEMS,
} from "@/features/mypage";
import { useMyProfile } from "@/features/mypage/hooks/useMyProfile";

export function MypageSection() {
  const { data: profile } = useMyProfile();

  const user = {
    email: profile?.data?.email ?? "회원",
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-6">
      {/* 좌측 패널 — 웹: 고정 사이드바 / 모바일: 상단 스택 */}
      <div className="flex flex-col gap-4">
        <MypageProfileCard user={user} />
        <MypageStatsCard stats={MYPAGE_DEFAULT_STATS} />
      </div>

      {/* 우측 메인 — 웹: 콘텐츠 영역 / 모바일: 하단 스택 */}
      <div className="flex flex-col gap-4">
        <MypageBanner items={MYPAGE_BANNERS} />
        <MypageNavMenu />
        <MypageManagement items={MYPAGE_MANAGEMENT_ITEMS} />
        <MypageInfo items={MYPAGE_INFO_ITEMS} />
      </div>
    </div>
  );
}
