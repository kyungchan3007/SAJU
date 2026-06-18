import { DashboardStatsContainer } from "@/features/dashboard/ui/dashboard-stats.client";

export function DashboardSection() {
  return (
    <section className="flex flex-col gap-4">
      <DashboardStatsContainer />
    </section>
  );
}
