import type { DailyEnergyResponse } from "@/generated/api";
import type { SajuProfileResponse } from "@/generated/api";
import { SajuHeroSection } from "@/domain/saju/guid-card/preview-card/ui/saju-hero-section";
import {
  SajuStatsSection,
  SajuMidSection,
  SajuAdviceSection,
  SajuExploreSection,
} from "@/domain/saju/guid-card/preview-card/ui/saju-preview-card.sections";
import { PageContentLayout } from "@/shared/ui/page-content-layout";

type SajuPreviewCardProps = {
  dailyResult?: DailyEnergyResponse | null;
  profile?: SajuProfileResponse | null;
};

export function SajuPreviewCard({
  dailyResult,
  profile,
}: SajuPreviewCardProps) {
  return (
    <PageContentLayout>
      <SajuHeroSection dailyResult={dailyResult} profile={profile} />
      <div className="pb-14 pt-4 md:pt-5">
        <SajuStatsSection dailyResult={dailyResult} />
        <div className="mt-3.5 flex flex-col gap-3.5">
          <SajuMidSection dailyResult={dailyResult} />
          <SajuAdviceSection dailyResult={dailyResult} />
          <SajuExploreSection />
        </div>
      </div>
    </PageContentLayout>
  );
}
