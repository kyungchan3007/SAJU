import { DashboardStatsContainer } from "@/features/dashboard/ui/dashboard-stats.client";

export function DashboardSection() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-text-primary">대시보드</h2>
      <DashboardStatsContainer />
    </section>
  );
}
