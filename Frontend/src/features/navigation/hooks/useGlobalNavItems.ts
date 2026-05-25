"use client";

import { usePathname } from "next/navigation";

import {
  GLOBAL_NAV_HIDDEN_PATHS,
  MOBILE_TAB_ITEMS,
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

  /** 데스크탑 링크: 마이를 제외한 전체 메뉴 (마이는 우측 아바타로 표시) */
  const desktopItems: ResolvedNavItem[] = NAV_ITEMS.slice(0, -1).map(
    (item) => ({
      ...item,
      active: isActive(item.href, pathname),
    }),
  );

  /** 모바일 탭: 5개 고정 */
  const mobileItems: ResolvedNavItem[] = MOBILE_TAB_ITEMS.map((item) => ({
    ...item,
    href: item.href === "/mypage" && !isLoggedIn ? "/login" : item.href,
    active: isActive(item.href, pathname),
  }));

  /** 마이 (데스크탑 우측 프로필용) */
  const mypageItem = NAV_ITEMS[NAV_ITEMS.length - 1];
  const profileItem: ResolvedNavItem = {
    ...mypageItem,
    href: !isLoggedIn ? "/login" : "/mypage",
    active: isActive("/mypage", pathname),
  };

  return { hidden, desktopItems, mobileItems, profileItem };
}
