import { ZodiacCompatibilitySection } from "@/widgets/mypage/ui/zodiac-compatibility-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "띠별 궁합",
  description: "나의 띠별 궁합을 확인합니다.",
  robots: { index: false, follow: false },
};

export default function ZodiacCompatibilityPage() {
  return <ZodiacCompatibilitySection />;
}
