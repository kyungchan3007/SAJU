import type { SajuProfile } from "@/entities/saju";
import { SajuResultCard } from "@/domain/saju-card";
import { SajuInputForm } from "@/features/saju-input";

type SajuResultCardProps = {
  profile?: Partial<SajuProfile>;
};

export function SajuResult({ profile }: SajuResultCardProps) {
  return (
    <div className="page-grid">
      <SajuInputForm />
      <SajuResultCard />
    </div>
  );
}
