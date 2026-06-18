import type { Metadata } from "next";
import { MonitoringSection } from "@/widgets/monitoring-section/ui/monitoring-section";

export const metadata: Metadata = { title: "모니터링" };

export default function MonitoringPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-content-primary">모니터링</h2>
        <p className="mt-1 text-sm text-content-muted">서버 상태와 API 응답 현황을 모니터링합니다.</p>
      </div>
      <MonitoringSection />
    </div>
  );
}
