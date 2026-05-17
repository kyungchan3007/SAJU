"use client";

import { useState } from "react";
import type { CompatibilitySectionDisplay } from "@/features/compatibility/model/compatibility";

export function useCompatibilityResultSections(
  sections: CompatibilitySectionDisplay[],
) {
  const [activeSectionLabel, setActiveSectionLabel] = useState<string | null>(
    null,
  );
  const matchedSectionIndex = activeSectionLabel
    ? sections.findIndex((section) => section.label === activeSectionLabel)
    : -1;
  const activeSectionIndex = matchedSectionIndex >= 0 ? matchedSectionIndex : 0;
  const activeSection = sections[activeSectionIndex];

  function setActiveSectionIndex(index: number) {
    setActiveSectionLabel(sections[index]?.label ?? null);
  }

  return {
    activeSectionIndex,
    activeSection,
    setActiveSectionIndex,
  };
}
