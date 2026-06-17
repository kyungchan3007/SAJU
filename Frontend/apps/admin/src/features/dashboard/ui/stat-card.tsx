import { Card } from "@saju/ui";

type StatCardProps = {
  label: string;
  value: string | number;
  sub?: string;
};

export function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-1 p-5">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className="text-2xl font-bold text-text-primary">{value}</span>
      {sub && <span className="text-xs text-text-tertiary">{sub}</span>}
    </Card>
  );
}
