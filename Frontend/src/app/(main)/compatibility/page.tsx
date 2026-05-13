import type { Metadata } from "next";
import { CompatibilitySection } from "@/widgets/compatibility/ui/compatibility-section";

export const metadata: Metadata = {
  title: "짝궁합",
  description: "나의 사주와 상대방의 사주를 비교해 궁합을 확인합니다.",
  robots: { index: false, follow: false },
};

export default function CompatibilityPage() {
  return (
    <main className="page-shell">
      <div className="mx-auto max-w-[720px]">
        <CompatibilitySection />
      </div>
    </main>
  );
}
