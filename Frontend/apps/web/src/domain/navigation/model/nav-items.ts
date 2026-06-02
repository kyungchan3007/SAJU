import {
  BookOpen,
  Heart,
  Sparkles,
  User,
  Users,
  UtensilsCrossed,
  Wand2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type ResolvedNavItem = NavItem & {
  active: boolean;
};

const PROTECTED_NAV_PATHS = new Set([
  "/saju",
  "/mypage/traditional-fortune",
  "/compatibility",
  "/community",
  "/food",
  "/mypage",
]);

/** 전체 메뉴 — 순서: 오늘의 운세 / 정통사주 / 궁합 / 타로 / 오늘의 메뉴 / 커뮤니티 / 마이 */
export const NAV_ITEMS: NavItem[] = [
  { href: "/saju", label: "오늘의 운세", icon: Sparkles },
  { href: "/mypage/traditional-fortune", label: "정통사주", icon: BookOpen },
  { href: "/compatibility", label: "궁합", icon: Heart },
  { href: "/taro", label: "타로", icon: Wand2 },
  { href: "/food", label: "오늘의 메뉴", icon: UtensilsCrossed },
  { href: "/community", label: "커뮤니티", icon: Users },
  { href: "/mypage", label: "마이", icon: User },
];

/** 모바일 하단 탭바 */
export const MOBILE_TAB_ITEMS: NavItem[] = [
  { href: "/saju", label: "오늘의 운세", icon: Sparkles },
  { href: "/mypage/traditional-fortune", label: "정통사주", icon: BookOpen },
  { href: "/compatibility", label: "궁합", icon: Heart },
  { href: "/taro", label: "타로", icon: Wand2 },
  { href: "/food", label: "오늘의 메뉴", icon: UtensilsCrossed },
  { href: "/community", label: "커뮤니티", icon: Users },
  { href: "/mypage", label: "마이", icon: User },
];

export const GLOBAL_NAV_HIDDEN_PATHS = ["/login", "/auth/restore"];

export function resolveNavItemHref(href: string, isLoggedIn: boolean): string {
  if (isLoggedIn || !PROTECTED_NAV_PATHS.has(href)) {
    return href;
  }

  return `/login?next=${encodeURIComponent(href)}`;
}
