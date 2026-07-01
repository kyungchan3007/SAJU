import { getPreviewConfig } from "@/features/preview/model/preview-registry";
import { YEAR_FORTUNE_PREVIEW_DATA } from "@/features/preview/model/year-fortune-preview-data";
import { PreviewPageCta } from "@/features/preview/ui/preview-page-cta";
import { PreviewPageLayout } from "@/features/preview/ui/preview-page-layout";
import { PreviewRelatedLinks } from "@/features/preview/ui/preview-related-links";
import { YearFortuneDomainTabs } from "@/features/year-fortune/ui/year-fortune-domain-tabs";
import { YearFortuneHero } from "@/features/year-fortune/ui/year-fortune-hero";
import { YearFortuneMonthly } from "@/features/year-fortune/ui/year-fortune-monthly";

const preview = getPreviewConfig("year-fortune");

export function YearFortunePreviewPage() {
  return (
    <PreviewPageLayout
      badge={preview.badge}
      title={preview.title}
      description={preview.description}
    >
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-8 pt-7">
        <YearFortuneHero
          yearLabel={YEAR_FORTUNE_PREVIEW_DATA.yearLabel}
          targetYear={YEAR_FORTUNE_PREVIEW_DATA.targetYear}
          userInfo={YEAR_FORTUNE_PREVIEW_DATA.userInfo}
        />
        <YearFortuneDomainTabs domains={YEAR_FORTUNE_PREVIEW_DATA.domains} />
        <YearFortuneMonthly
          months={YEAR_FORTUNE_PREVIEW_DATA.months}
          targetYear={YEAR_FORTUNE_PREVIEW_DATA.targetYear}
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
