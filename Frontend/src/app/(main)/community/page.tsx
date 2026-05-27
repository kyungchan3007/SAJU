import type { Metadata } from "next";
import { CommunitySection } from "@/widgets/community/ui/community-section";

export const metadata: Metadata = {
  title: "커뮤니티",
  description: "나와 비슷한 기운의 사람들과 연결되어보세요.",
  robots: { index: false, follow: false },
};

export default function CommunityPage() {
  return (
    <main className="page-shell">
      <div className="mx-auto max-w-[860px]">
        <CommunitySection />
      </div>
    </main>
  );
}
