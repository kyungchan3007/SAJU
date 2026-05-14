import type { Metadata } from "next";
import { TraditionalFortuneSection } from "@/features/traditional-fortune/ui/traditional-fortune-section";

export const metadata: Metadata = {
  title: "정통사주 풀이",
  description: "정통사주 기반 연간 운세 풀이를 확인합니다.",
  robots: { index: false, follow: false },
};

export default function TraditionalFortunePage() {
  return (
    <main className="">
      <div className="mx-auto max-w-[720px]">
        <TraditionalFortuneSection />
      </div>
    </main>
  );
}
