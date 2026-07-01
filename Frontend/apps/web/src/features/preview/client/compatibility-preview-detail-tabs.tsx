"use client";

import { useCompatibilityResultSections } from "@/features/compatibility/hooks/useCompatibilityResultSections";
import type { CompatibilitySectionDisplay } from "@/features/compatibility/model/compatibility";
import { CompatibilityResultDetailTabs } from "@/features/compatibility/ui/components/compatibility-result-detail-tabs";

type CompatibilityPreviewDetailTabsProps = {
  sections: CompatibilitySectionDisplay[];
};

export function CompatibilityPreviewDetailTabs({
  sections,
}: CompatibilityPreviewDetailTabsProps) {
  const { activeSectionIndex, activeSection, setActiveSectionIndex } =
    useCompatibilityResultSections(sections);

  return (
    <CompatibilityResultDetailTabs
      sections={sections}
      activeSectionIndex={activeSectionIndex}
      activeSection={activeSection}
      onSelectSection={setActiveSectionIndex}
    />
  );
}
