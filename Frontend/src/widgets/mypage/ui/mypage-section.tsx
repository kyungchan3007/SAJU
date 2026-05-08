"use client";

import {
  MypageBanner,
  MypageNavMenu,
  MypageManagement,
  MypageInfo,
  MYPAGE_BANNERS,
  MYPAGE_INFO_ITEMS,
  MYPAGE_MANAGEMENT_ITEMS,
} from "@/features/mypage";

export function MypageSection() {
  return (
    <div className="flex flex-col gap-4">
      <MypageBanner items={MYPAGE_BANNERS} />
      <MypageNavMenu />
      <MypageManagement items={MYPAGE_MANAGEMENT_ITEMS} />
      <MypageInfo items={MYPAGE_INFO_ITEMS} />
    </div>
  );
}
