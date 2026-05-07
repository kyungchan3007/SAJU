"use client";

import { usePathname } from "next/navigation";

import {
  GLOBAL_NAV_HIDDEN_PATHS,
  NAV_ITEMS,
  type ResolvedNavItem,
} from "@/domain/navigation/model/nav-items";

function isActive(href: string, pathname: string): boolean {
  if (href === "/home") {
    return pathname === "/home" || pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function shouldHideNav(pathname: string): boolean {
  return GLOBAL_NAV_HIDDEN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function useGlobalNavItems(isLoggedIn: boolean) {
  const pathname = usePathname();
  const hidden = shouldHideNav(pathname);
  const items: ResolvedNavItem[] = NAV_ITEMS.map((item) => ({
    ...item,
    href: item.href === "/mypage" && !isLoggedIn ? "/login" : item.href,
    active: isActive(item.href, pathname),
  }));

  return {
    hidden,
    mainItems: items.slice(0, 4),
    mobileItems: items,
    profileItem: items[4],
  };
}
