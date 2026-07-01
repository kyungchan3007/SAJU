import { CompatibilityResultHeader } from "@/features/compatibility/ui/components/compatibility-result-header";
import { CompatibilityResultScore } from "@/features/compatibility/ui/components/compatibility-result-score";
import { CompatibilityResultSections } from "@/features/compatibility/ui/components/compatibility-result-sections";
import { CompatibilityResultSummary } from "@/features/compatibility/ui/components/compatibility-result-summary";
import { CompatibilityPreviewDetailTabs } from "@/features/preview/client/compatibility-preview-detail-tabs";
import {
  COMPATIBILITY_PREVIEW_MY_PROFILE,
  COMPATIBILITY_PREVIEW_PARTNER,
  COMPATIBILITY_PREVIEW_RESULT,
} from "@/features/preview/model/compatibility-preview-data";
import { getPreviewConfig } from "@/features/preview/model/preview-registry";
import { PreviewPageCta } from "@/features/preview/ui/preview-page-cta";
import { PreviewPageLayout } from "@/features/preview/ui/preview-page-layout";
import { PreviewRelatedLinks } from "@/features/preview/ui/preview-related-links";

const preview = getPreviewConfig("compatibility");

export function CompatibilityPreviewPage() {
  return (
    <PreviewPageLayout
      badge={preview.badge}
      title={preview.title}
      description={preview.description}
    >
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-5 pt-7">
        <CompatibilityResultHeader
          myProfile={COMPATIBILITY_PREVIEW_MY_PROFILE}
          partner={COMPATIBILITY_PREVIEW_PARTNER}
        />
        <CompatibilityResultScore
          overallScore={COMPATIBILITY_PREVIEW_RESULT.overallScore}
          keyword={COMPATIBILITY_PREVIEW_RESULT.keyword}
          description={COMPATIBILITY_PREVIEW_RESULT.description}
          circumference={0}
        />
        <CompatibilityResultSections
          sections={COMPATIBILITY_PREVIEW_RESULT.sections}
        />
        <CompatibilityPreviewDetailTabs
          sections={COMPATIBILITY_PREVIEW_RESULT.sections}
        />
        <CompatibilityResultSummary
          description={COMPATIBILITY_PREVIEW_RESULT.description}
          tags={COMPATIBILITY_PREVIEW_RESULT.tags}
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
