import type { LucideIcon } from "lucide-react";
import { Card } from "@saju/ui";

type StatCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  icon?: LucideIcon;
};

export function StatCard({ label, value, sub, icon: Icon }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-1 p-5">
      {Icon && (
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-saju-soft">
          <Icon className="h-4 w-4 text-saju-primary" />
        </div>
      )}
      <span className="text-sm text-content-secondary">{label}</span>
      <span className="text-2xl font-bold text-content-primary">{value}</span>
      {sub && <span className="text-xs text-content-muted">{sub}</span>}
    </Card>
  );
}
