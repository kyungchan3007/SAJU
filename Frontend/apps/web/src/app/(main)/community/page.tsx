import type { Metadata } from "next";
import { CommunitySection } from "@/widgets/community/ui/community-section";

export const metadata: Metadata = {
  title: "커뮤니티",
  description: "나와 비슷한 기운의 사람들과 연결되어보세요.",
  robots: { index: false, follow: false },
};

export default function CommunityPage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-[1152px] px-4 py-8 md:px-8">
        <div className="min-w-0">
          <CommunitySection />
        </div>
      </div>
    </main>
  );
}
