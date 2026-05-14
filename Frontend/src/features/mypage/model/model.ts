import type {
  MypageStats,
  BannerItem,
  ManagementItem,
  InfoItem,
  NavTab,
  NavMenuItem,
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
  { icon: "🌙", label: "사주정보 관리", href: "/mypage/saju-manage" },
];

export const MYPAGE_INFO_ITEMS: InfoItem[] = [
  { icon: "📣", label: "공지사항", href: "#" },
  { icon: "💬", label: "고객센터", href: "#" },
  { icon: "👍", label: "추천하기", href: "#" },
  { icon: "🏠", label: "점신 상담사 입점하기", href: "#" },
];

export const TABS: NavTab[] = ["운세"];

export const MENU_BY_TAB: Record<NavTab, NavMenuItem[]> = {
  운세: [
    { icon: "🔮", label: "오늘의 운세", sub: "매일 업데이트", href: "/saju" },
    { icon: "⭐", label: "사주분석", sub: "사주 기반 풀이", href: "/mypage/traditional-fortune" },
    {
      icon: "💑",
      label: "궁합",
      sub: "두 사람의 인연",
      href: "/compatibility",
    },
    {
      icon: "🐯",
      label: "띠별궁합",
      sub: "띠로 보는 인연",
      href: "/mypage/zodiac-compatibility",
    },
    {
      icon: "📅",
      label: "신년운세",
      sub: "2025년 흐름",
      href: "/mypage/year-fortune",
    },
  ],
};
