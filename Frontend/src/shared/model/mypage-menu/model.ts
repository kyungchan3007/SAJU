export type MypageAllMenuIconKey =
  | "today-fortune"
  | "saju-analysis"
  | "compatibility"
  | "zodiac-compatibility"
  | "year-fortune";

export type MypageAllMenuItem = {
  label: string;
  sub: string;
  href: string;
  iconKey: MypageAllMenuIconKey;
};

export const MYPAGE_ALL_MENU_ITEMS: MypageAllMenuItem[] = [
  {
    label: "오늘의 운세",
    sub: "매일 업데이트",
    href: "/saju",
    iconKey: "today-fortune",
  },
  {
    label: "사주분석",
    sub: "사주 기본 풀이",
    href: "/mypage/traditional-fortune",
    iconKey: "saju-analysis",
  },
  {
    label: "궁합",
    sub: "두 사람의 인연",
    href: "/compatibility",
    iconKey: "compatibility",
  },
  {
    label: "띠별궁합",
    sub: "띠로 보는 인연",
    href: "/mypage/zodiac-compatibility",
    iconKey: "zodiac-compatibility",
  },
  {
    label: "신년운세",
    sub: "2026년 흐름",
    href: "/mypage/year-fortune",
    iconKey: "year-fortune",
  },
];

