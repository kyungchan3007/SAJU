import type { SajuProfile } from "@/entities/saju";
import { GuidCard } from "@/domain/saju";
import { SajuInputForm } from "@/features/saju-input";

type SajuResultCardProps = {
  profile?: Partial<SajuProfile>;
};

export function SajuResult({ profile }: SajuResultCardProps) {
  return (
    <div className="page-grid">
      <SajuInputForm />
      <GuidCard />
    </div>
  );
}
