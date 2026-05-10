import { SajuManageSection } from "@/widgets/mypage/ui/saju-manage-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사주 관리",
  description: "나의 사주 정보를 확인하고 수정합니다.",
  robots: { index: false, follow: false },
};

export default function SajuManagePage() {
  return <SajuManageSection />;
}
