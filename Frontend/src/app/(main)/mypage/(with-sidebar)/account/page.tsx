import type { Metadata } from "next";
import { AccountPageClient } from "./account-page.client";

export const metadata: Metadata = {
  title: "계정관리",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return <AccountPageClient />;
}

