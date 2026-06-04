"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { isGlobalNavHiddenPath } from "@/domain/navigation/model/nav-items";

type AppChromeOffsetProps = {
  children: ReactNode;
};

export function AppChromeOffset({ children }: AppChromeOffsetProps) {
  const pathname = usePathname();
  const hideNav = isGlobalNavHiddenPath(pathname);

  return (
    <div
      className={
        hideNav
          ? "flex min-h-dvh flex-col"
          : "flex min-h-dvh flex-col pt-14 pb-16 md:pb-0"
      }
    >
      {children}
    </div>
  );
}
