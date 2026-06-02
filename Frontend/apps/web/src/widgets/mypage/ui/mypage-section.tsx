import {
  MypageBanner,
  MypageAllMenu,
  MypageManagement,
  MypageInfo,
  MYPAGE_MANAGEMENT_ITEMS,
  MYPAGE_INFO_ITEMS,
} from "@/features/mypage";

export function MypageSection() {
  return (
    <div className="flex flex-col gap-8">
      {/* 커뮤니티 배너 */}
      <MypageBanner />

      {/* 전체 메뉴 */}
      <MypageAllMenu />

      {/* 관리 + 안내 (md: 2열) */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <MypageManagement items={MYPAGE_MANAGEMENT_ITEMS} />
        <MypageInfo items={MYPAGE_INFO_ITEMS} />
      </div>
    </div>
  );
}
