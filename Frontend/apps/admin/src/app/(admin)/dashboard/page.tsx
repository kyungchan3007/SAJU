import type { Metadata } from "next";

import { DashboardSection } from "@/widgets/dashboard-section/ui/dashboard-section";

export const metadata: Metadata = { title: "대시보드" };

export default function DashboardPage() {
  return (
    <div className="p-6">
      <DashboardSection />
    </div>
  );
}
