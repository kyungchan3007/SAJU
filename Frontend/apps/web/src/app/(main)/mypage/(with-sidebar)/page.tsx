import { MypageSection } from "@/widgets/mypage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "내 정보, 복주머니, 코인, 사주정보를 관리합니다.",
  alternates: { canonical: "/mypage" },
  robots: { index: false, follow: false },
};

export default async function MypagePage() {
  return <MypageSection />;
}

