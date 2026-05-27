import type { Metadata } from "next";
import { TaroComingSoonSection } from "@/widgets/taro-coming-soon/ui/taro-coming-soon-section";

export const metadata: Metadata = {
  title: "타로",
  description: "사주와 연결된 나만의 타로 리딩 서비스를 준비하고 있어요.",
  robots: { index: false, follow: false },
};

export default function TaroPage() {
  return (
    <main className="page-shell">
      <TaroComingSoonSection />
    </main>
  );
}
