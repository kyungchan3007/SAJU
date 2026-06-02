"use client";

import { useZodiacCompatibilitySection } from "@/features/mypage/hooks/useZodiacCompatibilitySection";

import { ZodiacCompatibilitySectionView } from "./zodiac-compatibility-section-view";

export function ZodiacCompatibilitySectionContainer() {
  const section = useZodiacCompatibilitySection();

  return <ZodiacCompatibilitySectionView {...section} />;
}
