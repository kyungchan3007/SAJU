"use client";

import { usePathname } from "next/navigation";
import { MypageSidebar } from "@/features/mypage";
import type { MypageUser } from "../type/types";

export function MypageLayoutShell({
  children,
  initialProfile,
}: {
  children: React.ReactNode;
  initialProfile: MypageUser;
}) {
  const pathname = usePathname();
  const isAdGateFullscreenPage =
    pathname === "/mypage/year-fortune" ||
    pathname === "/mypage/traditional-fortune";

  if (isAdGateFullscreenPage) {
    return <div>{children}</div>;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-6">
      <MypageSidebar user={initialProfile} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
