import { TRADITIONAL_SAJU_PREVIEW_DATA } from "@/features/preview/model/traditional-saju-preview-data";
import { getPreviewConfig } from "@/features/preview/model/preview-registry";
import { PreviewPageCta } from "@/features/preview/ui/preview-page-cta";
import { PreviewPageLayout } from "@/features/preview/ui/preview-page-layout";
import { PreviewRelatedLinks } from "@/features/preview/ui/preview-related-links";
import { JeongtongsajuDaewoon } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-daewoon";
import { JeongtongsajuFiveElements } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-fiveelements";
import { JeongtongsajuHero } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-hero";
import { JeongtongsajuPillars } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-pillars";
import { JeongtongsajuTwelveGrowth } from "@/features/mypage/ui/jeongtongsaju/jeongtongsaju-twelve-growth";

const preview = getPreviewConfig("traditional-saju");

export function TraditionalSajuPreviewPage() {
  return (
    <PreviewPageLayout
      badge={preview.badge}
      title={preview.title}
      description={preview.description}
    >
      <div className="flex flex-col gap-8">
        <JeongtongsajuHero
          traits={TRADITIONAL_SAJU_PREVIEW_DATA.traits}
          fiveElements={TRADITIONAL_SAJU_PREVIEW_DATA.fiveElements}
          gender="FEMALE"
          nickname="미리보기"
        />
        <JeongtongsajuPillars pillars={TRADITIONAL_SAJU_PREVIEW_DATA.pillars} />
        <JeongtongsajuFiveElements
          fiveElements={TRADITIONAL_SAJU_PREVIEW_DATA.fiveElements}
        />
        <JeongtongsajuTwelveGrowth
          twelveGrowthInfo={TRADITIONAL_SAJU_PREVIEW_DATA.twelveGrowthInfo}
          description={
            TRADITIONAL_SAJU_PREVIEW_DATA.sectionDescriptions.twelveGrowth
          }
        />
        <JeongtongsajuDaewoon
          bigLuck={TRADITIONAL_SAJU_PREVIEW_DATA.bigLuck}
          description={
            TRADITIONAL_SAJU_PREVIEW_DATA.sectionDescriptions.bigLuck
          }
        />
        <PreviewRelatedLinks
          heading={preview.relatedLinks.heading}
          links={preview.relatedLinks.links}
        />
        <PreviewPageCta
          title={preview.cta.title}
          description={preview.cta.description}
          href={preview.cta.href}
          label={preview.cta.label}
        />
      </div>
    </PreviewPageLayout>
  );
}
