"use client";

import { useAnalysisProgress } from "@/features/saju-result/hooks/useAnalysisProgress";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";
import { FortuneGateLayout } from "@/shared/ui/fortune-page-layout";

export function AnalysisPendingGate() {
  const progress = useAnalysisProgress(true);

  return (
    <FortuneGateLayout>
      <AdProgressGate progress={progress} />
    </FortuneGateLayout>
  );
}
