import {
  Heart,
  Home,
  MapPin,
  Sparkles,
  User,
  Users,
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

/** 전체 메뉴 — 순서: 홈 / 사주 / 궁합 / 위치추천 / 타로 / 커뮤니티 / 마이 */
export const NAV_ITEMS: NavItem[] = [
  { href: "/home", label: "홈", icon: Home },
  { href: "/saju", label: "사주", icon: Sparkles },
  { href: "/compatibility", label: "궁합", icon: Heart },
  { href: "/location", label: "위치추천", icon: MapPin },
  { href: "/taro", label: "타로", icon: Wand2 },
  { href: "/community", label: "커뮤니티", icon: Users },
  { href: "/mypage", label: "마이", icon: User },
];

/** 모바일 하단 탭바 */
export const MOBILE_TAB_ITEMS: NavItem[] = [
  { href: "/home", label: "홈", icon: Home },
  { href: "/saju", label: "사주", icon: Sparkles },
  { href: "/compatibility", label: "궁합", icon: Heart },
  { href: "/location", label: "위치추천", icon: MapPin },
  { href: "/taro", label: "타로", icon: Wand2 },
  { href: "/community", label: "커뮤니티", icon: Users },
  { href: "/mypage", label: "마이", icon: User },
];

export const GLOBAL_NAV_HIDDEN_PATHS = ["/login", "/auth/restore"];
