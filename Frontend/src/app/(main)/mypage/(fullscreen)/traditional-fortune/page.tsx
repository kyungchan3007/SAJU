import type { Metadata } from "next";
import { JeongtongsajuAndFortuneSection } from "@/widgets/mypage/ui/jeongtongsaju-and-fortune-section";

export const metadata: Metadata = {
  title: "정통사주",
  description: "AI가 해석한 나의 명식 리포트와 연간 운세 풀이를 확인합니다.",
  robots: { index: false, follow: false },
};

export default function TraditionalFortunePage() {
  return <JeongtongsajuAndFortuneSection />;
}

