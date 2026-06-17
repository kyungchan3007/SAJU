import type { Metadata } from "next";
import { CommunityCohotSection } from "@/widgets/community-cohort-section/ui/community-cohort-section";

export const metadata: Metadata = { title: "커뮤니티 기수 관리" };

export default function CommunityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-content-primary">커뮤니티 기수 관리</h2>
        <p className="mt-1 text-sm text-content-muted">기수 현황 조회 및 신규 기수를 등록합니다.</p>
      </div>
      <CommunityCohotSection />
    </div>
  );
}
