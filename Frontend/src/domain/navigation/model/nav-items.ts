import { Heart, Home, MapPin, Sparkles, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type ResolvedNavItem = NavItem & {
  active: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/home", label: "홈", icon: Home },
  { href: "/saju", label: "사주", icon: Sparkles },
  { href: "/compatibility", label: "궁합", icon: Heart },
  { href: "/location", label: "위치추천", icon: MapPin },
  { href: "/mypage", label: "마이", icon: User },
];

export const GLOBAL_NAV_HIDDEN_PATHS = ["/login", "/auth/restore"];
