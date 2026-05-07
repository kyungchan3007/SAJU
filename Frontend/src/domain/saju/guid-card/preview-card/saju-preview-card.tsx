import type { DailyEnergyResponse } from "@/generated/api";
import {
  SajuHeroSection,
  SajuInsightsSection,
  SajuStatsSection,
} from "@/domain/saju/guid-card/preview-card/saju-preview-card.sections";

type SajuPreviewCardProps = {
  dailyResult?: DailyEnergyResponse | null;
};

export function SajuPreviewCard({ dailyResult }: SajuPreviewCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-sm"
      data-has-result={Boolean(dailyResult)}
    >
      <div className="card-saju-primary h-full space-y-[18px] overflow-y-auto p-6">
        <SajuHeroSection dailyResult={dailyResult} />
        <SajuStatsSection dailyResult={dailyResult} />
        <SajuInsightsSection dailyResult={dailyResult} />
        {/*<SajuLocationSection dailyResult={dailyResult} />*/}
      </div>
    </div>
  );
}
