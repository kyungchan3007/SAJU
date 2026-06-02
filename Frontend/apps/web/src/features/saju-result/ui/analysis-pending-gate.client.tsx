"use client";

import { useAnalysisProgress } from "@/features/saju-result/hooks/useAnalysisProgress";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";

export function AnalysisPendingGate() {
  const progress = useAnalysisProgress(true);

  return <AdProgressGate progress={progress} />;
}
