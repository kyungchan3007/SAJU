import { MonitoringDashboardContainer } from "@/features/monitoring/ui/monitoring-dashboard.client";

export function MonitoringSection() {
  return (
    <section className="flex flex-col gap-4">
      <MonitoringDashboardContainer />
    </section>
  );
}
