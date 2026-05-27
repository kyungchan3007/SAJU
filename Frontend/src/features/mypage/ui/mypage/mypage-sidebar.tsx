import { MYPAGE_SAJU_SUMMARY_ITEMS } from "../../model/model";
import type { MypageUser } from "../../type/types";
import { MypageProfileCard } from "./mypage-profile-card";
import { MypageSajuSummary } from "./mypage-saju-summary";

export function MypageSidebar({ user }: { user: MypageUser }) {
  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24">
      <MypageProfileCard user={user} />
      <MypageSajuSummary items={MYPAGE_SAJU_SUMMARY_ITEMS} />
    </div>
  );
}
