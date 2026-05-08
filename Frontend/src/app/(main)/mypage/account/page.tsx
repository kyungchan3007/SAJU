import { getMyProfileOnServer } from "@/entities/user/server/getMyProfileOnServer";
import { AccountSection } from "@/widgets/mypage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "계정관리",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const profileResult = await getMyProfileOnServer();
  const email =
    profileResult.success ? (profileResult.data?.email ?? "") : "";

  return <AccountSection email={email} />;
}
