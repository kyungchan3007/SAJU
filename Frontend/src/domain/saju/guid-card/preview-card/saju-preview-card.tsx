import {
  SajuHeroSection,
  SajuInsightsSection,
  SajuLocationSection,
  SajuStatsSection,
} from "@/domain/saju/guid-card/preview-card/saju-preview-card.sections";

export function SajuPreviewCard() {
  return (
    <div className="relative overflow-hidden rounded-sm">
      <div className="card-saju-primary h-full space-y-[18px] overflow-y-auto p-6">
        <SajuHeroSection />
        <SajuStatsSection />
        <SajuInsightsSection />
        <SajuLocationSection />
      </div>
    </div>
  );
}
