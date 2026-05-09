import { JeongtongsajuSection } from "@/widgets/mypage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "정통사주",
  description: "나의 사주 4기둥, 오행 밸런스, 대운 흐름을 확인합니다.",
  robots: { index: false, follow: false },
};

export default function JeongtongsajuPage() {
  return <JeongtongsajuSection />;
}
