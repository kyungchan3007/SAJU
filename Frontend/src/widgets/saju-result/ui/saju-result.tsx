import { SajuInputForm } from "@/features/saju-input";
import { SajuPreviewCard } from "./saju-preview-card";

export function SajuResult() {
  return (
    <div className="grid gap-6">
      <SajuInputForm />
      <SajuPreviewCard />
    </div>
  );
}
