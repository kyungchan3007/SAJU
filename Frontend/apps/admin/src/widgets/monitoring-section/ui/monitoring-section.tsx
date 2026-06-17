import { MonitoringDashboardContainer } from "@/features/monitoring/ui/monitoring-dashboard.client";

export function MonitoringSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-text-primary">모니터링</h2>
      <MonitoringDashboardContainer />
    </section>
  );
}
