import type { Metadata } from "next";

import { MonitoringSection } from "@/widgets/monitoring-section/ui/monitoring-section";

export const metadata: Metadata = { title: "모니터링" };

export default function MonitoringPage() {
  return (
    <div className="p-6">
      <MonitoringSection />
    </div>
  );
}
