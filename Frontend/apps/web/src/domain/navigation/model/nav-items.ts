export type NavIconKey =
  | "sparkles"
  | "book-open"
  | "heart"
  | "wand"
  | "utensils"
  | "users"
  | "user"
  | "help"
  | "mail";

export type NavItem = {
  href: string;
  label: string;
  icon: NavIconKey;
};

export type ResolvedNavItem = NavItem & {
  active: boolean;
};

const PROTECTED_NAV_PATHS = new Set([
  "/mypage/traditional-fortune",
  "/compatibility",
  "/community",
  "/food",
  "/mypage",
]);

/** 전체 메뉴 — 순서: 오늘의 운세 / 정통사주 / 궁합 / 타로 / 오늘의 메뉴 / 커뮤니티 / 마이 */
export const NAV_ITEMS: NavItem[] = [
  { href: "/saju", label: "오늘의 운세", icon: "sparkles" },
  { href: "/mypage/traditional-fortune", label: "정통사주", icon: "book-open" },
  { href: "/compatibility", label: "궁합", icon: "heart" },
  { href: "/taro", label: "타로", icon: "wand" },
  { href: "/food", label: "오늘의 메뉴", icon: "utensils" },
  { href: "/community", label: "소개팅", icon: "users" },
  { href: "/mypage", label: "마이", icon: "user" },
];

/** 심사 단계 비로그인 사용자용 공개 메뉴 */
export const GUEST_NAV_ITEMS: NavItem[] = [
  { href: "/saju", label: "오늘의 운세", icon: "sparkles" },
  { href: "/blog", label: "사주 이야기", icon: "book-open" },
  { href: "/faq", label: "FAQ", icon: "help" },
  { href: "/contact", label: "문의", icon: "mail" },
  { href: "/mypage", label: "마이", icon: "user" },
];

/** 모바일 하단 탭바 */
export const MOBILE_TAB_ITEMS: NavItem[] = [
  { href: "/saju", label: "오늘의 운세", icon: "sparkles" },
  { href: "/mypage/traditional-fortune", label: "정통사주", icon: "book-open" },
  { href: "/compatibility", label: "궁합", icon: "heart" },
  { href: "/taro", label: "타로", icon: "wand" },
  { href: "/food", label: "오늘의 메뉴", icon: "utensils" },
  { href: "/community", label: "커뮤니티", icon: "users" },
  { href: "/mypage", label: "마이", icon: "user" },
];

export const GLOBAL_NAV_HIDDEN_PATHS = ["/login", "/auth/restore"];

export function isGlobalNavHiddenPath(pathname: string): boolean {
  return GLOBAL_NAV_HIDDEN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function resolveNavItemHref(href: string, isLoggedIn: boolean): string {
  if (isLoggedIn || !PROTECTED_NAV_PATHS.has(href)) {
    return href;
  }

  return `/login?next=${encodeURIComponent(href)}`;
}
