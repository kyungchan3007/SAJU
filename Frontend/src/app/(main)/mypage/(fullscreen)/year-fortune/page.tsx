import type { Metadata } from "next";
import { YearFortuneSection } from "@/widgets/year-fortune/ui/year-fortune-section";

export const metadata: Metadata = {
  title: "신년운세",
  description: "사주를 바탕으로 새해의 운세를 확인해.",
  robots: { index: false, follow: false },
};

export default function YearFortunePage() {
  return <YearFortuneSection />;
}

