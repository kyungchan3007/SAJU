"use client";

import { usePathname } from "next/navigation";

import {
  GUEST_NAV_ITEMS,
  MOBILE_TAB_ITEMS,
  NAV_ITEMS,
  isGlobalNavHiddenPath,
  resolveNavItemHref,
  type ResolvedNavItem,
} from "@/domain/navigation/model/nav-items";

function isActive(href: string, pathname: string): boolean {
  if (href === "/home") {
    return pathname === "/home" || pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function useGlobalNavItems(isLoggedIn: boolean) {
  const pathname = usePathname();
  const hidden = isGlobalNavHiddenPath(pathname);
  const desktopSourceItems = isLoggedIn ? NAV_ITEMS.slice(0, -1) : GUEST_NAV_ITEMS.slice(0, -1);
  const mobileSourceItems = isLoggedIn ? MOBILE_TAB_ITEMS : GUEST_NAV_ITEMS;

  /** 데스크탑 링크: 마이를 제외한 전체 메뉴 (마이는 우측 아바타로 표시) */
  const desktopItems: ResolvedNavItem[] = desktopSourceItems.map(
    (item) => ({
      ...item,
      href: resolveNavItemHref(item.href, isLoggedIn),
      active: isActive(item.href, pathname),
    }),
  );

  /** 모바일 탭 */
  const mobileItems: ResolvedNavItem[] = mobileSourceItems.map((item) => ({
    ...item,
    href: resolveNavItemHref(item.href, isLoggedIn),
    active: isActive(item.href, pathname),
  }));

  /** 마이 (데스크탑 우측 프로필용) */
  const mypageItem = NAV_ITEMS[NAV_ITEMS.length - 1];
  const profileItem: ResolvedNavItem = {
    ...mypageItem,
    href: resolveNavItemHref("/mypage", isLoggedIn),
    active: isActive("/mypage", pathname),
  };

  return { hidden, desktopItems, mobileItems, profileItem };
}
