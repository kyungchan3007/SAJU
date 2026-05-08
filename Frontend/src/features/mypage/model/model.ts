import type {
  MypageStats,
  BannerItem,
  ManagementItem,
  InfoItem,
} from "@/features/mypage";

export const MYPAGE_DEFAULT_STATS: MypageStats = {
  luckyBag: 0,
  coins: 0,
};

export const MYPAGE_BANNERS: BannerItem[] = [
  {
    tag: "상담 이용 가이드",
    title: "1:1 실시간 상담\n이용가이드",
    emoji: "🧑‍💼📗",
  },
  {
    tag: "이벤트",
    title: "신규 가입 혜택\n지금 확인하세요",
    emoji: "🎁",
  },
];

export const MYPAGE_MANAGEMENT_ITEMS: ManagementItem[] = [
  { icon: "👤", label: "계정 관리", href: "/mypage/account" },
  { icon: "🌙", label: "사주정보 관리", href: "#" },
];

export const MYPAGE_INFO_ITEMS: InfoItem[] = [
  { icon: "📣", label: "공지사항", href: "#" },
  { icon: "💬", label: "고객센터", href: "#" },
  { icon: "👍", label: "추천하기", href: "#" },
  { icon: "🏠", label: "점신 상담사 입점하기", href: "#" },
];
