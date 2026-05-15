"use client";

import { useEffect, useState } from "react";
import type { CompatibilitySectionDisplay } from "@/features/compatibility/model/compatibility";

export function useCompatibilityResultSections(
  sections: CompatibilitySectionDisplay[],
) {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    setActiveSectionIndex(0);
  }, [sections]);

  return {
    activeSectionIndex,
    activeSection,
    setActiveSectionIndex,
  };
}
