"use client";

import { MYPAGE_DEFAULT_STATS } from "../../model/model";
import type { MypageUser } from "../../type/types";
import { MypageProfileCard } from "./mypage-profile-card";
import { MypageStatsCard } from "./mypage-stats-card";

export function MypageSidebar({ user }: { user: MypageUser }) {
  return (
    <div className="flex flex-col gap-4 lg:sticky lg:top-24">
      <MypageProfileCard user={user} />
      <MypageStatsCard stats={MYPAGE_DEFAULT_STATS} />
    </div>
  );
}
