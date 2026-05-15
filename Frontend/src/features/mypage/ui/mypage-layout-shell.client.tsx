"use client";

import { usePathname } from "next/navigation";
import { MypageSidebar } from "@/features/mypage";

export function MypageLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdGateFullscreenPage =
    pathname === "/mypage/year-fortune" ||
    pathname === "/mypage/traditional-fortune";

  if (isAdGateFullscreenPage) {
    return <div>{children}</div>;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-6">
      <MypageSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
