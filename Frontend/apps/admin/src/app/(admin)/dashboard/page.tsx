import type { Metadata } from "next";
import { DashboardSection } from "@/widgets/dashboard-section/ui/dashboard-section";

export const metadata: Metadata = { title: "대시보드" };

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-content-primary">대시보드</h2>
        <p className="mt-1 text-sm text-content-muted">서비스 현황과 실시간 트래픽을 확인합니다.</p>
      </div>
      <DashboardSection />
    </div>
  );
}
