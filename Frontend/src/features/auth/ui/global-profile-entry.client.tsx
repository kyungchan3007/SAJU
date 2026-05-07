"use client";

import { usePathname } from "next/navigation";

import { ProfileEntryButton } from "@/features/auth/ui/profile-entry-button.client";

const HIDDEN_PATHS = ["/mypage", "/login"];

type GlobalProfileEntryProps = {
  isLoggedIn: boolean;
};

export function GlobalProfileEntry({ isLoggedIn }: GlobalProfileEntryProps) {
  const pathname = usePathname();

  if (HIDDEN_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }

  return (
    <div className="fixed right-4 top-4 z-50">
      <ProfileEntryButton isLoggedIn={isLoggedIn} />
    </div>
  );
}
