import Link from "next/link";
import { Bell } from "lucide-react";

import type { ResolvedNavItem } from "@/domain/navigation/model/nav-items";
import { GlobalNavLogo } from "@/domain/navigation/ui/navLogo/GlobalNavLogo";
import { DesktopMainMenu } from "@/domain/navigation/ui/MainMenu/DesktopMainMenu";
import { MobileTabBar } from "@/domain/navigation/ui/mobile/MobileTabBar";

type GlobalNavViewProps = {
  isLoggedIn: boolean;
  desktopItems: ResolvedNavItem[];
  mobileItems: ResolvedNavItem[];
  profileItem?: ResolvedNavItem;
};

export function GlobalNavView({
  isLoggedIn,
  desktopItems,
  mobileItems,
  profileItem,
}: GlobalNavViewProps) {
  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 hidden h-14 border-b border-gray-100 bg-white/[0.97] backdrop-blur-md md:block"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          <GlobalNavLogo />
          <DesktopMainMenu items={desktopItems} />
          <DesktopNavActions
            isLoggedIn={isLoggedIn}
            profileItem={profileItem}
          />
        </div>
      </header>

      <MobileTabBar items={mobileItems} />
    </>
  );
}

function DesktopNavActions({
  isLoggedIn,
  profileItem,
}: {
  isLoggedIn: boolean;
  profileItem?: ResolvedNavItem;
}) {
  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href={{ pathname: "/login" }}
          className={`text-sm font-semibold transition-colors ${
            profileItem?.active
              ? "text-[#5956E9]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          로그인
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100"
        aria-label="알림"
      >
        <Bell size={17} strokeWidth={1.8} />
      </button>
      <Link
        href={{ pathname: "/mypage" }}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-saju-gradient-br text-xs font-bold text-white"
        aria-label="마이페이지"
      >
        ME
      </Link>
    </div>
  );
}
