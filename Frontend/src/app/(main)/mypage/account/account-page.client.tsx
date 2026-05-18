"use client";

import { useMyProfile } from "@/features/mypage/hooks/useMyProfile";
import { AccountSection } from "@/widgets/mypage";

export function AccountPageClient() {
  const { data } = useMyProfile();
  const email = data?.success ? (data.data?.email ?? "") : "";

  return <AccountSection email={email} />;
}
