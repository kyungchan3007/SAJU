import type { Metadata } from "next";

import { YearFortuneSection } from "@/widgets/year-fortune/ui/year-fortune-section";

export const metadata: Metadata = {
  title: "신년운세",
  description: "사주를 바탕으로 올해의 운세를 풀이합니다.",
  robots: { index: false, follow: false },
};

export default function YearFortunePage() {
  return (
    <main className={""}>
      <div className="mx-auto max-w-[720px]">
        <h2 className="mb-4 flex items-center gap-2.5 font-display text-[22px]">
          신년운세 <span className="h-0.5 flex-1 bg-black" />
        </h2>
        <YearFortuneSection />
      </div>
    </main>
  );
}
