"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SajuPreviewCard } from "@/domain/saju";
import { fetchSajuResultOnClient } from "@/entities/saju";
import { useAnalysisProgress } from "@/features/saju-result/hooks/useAnalysisProgress";
import { SAJU_RESULT_QUERY_KEY } from "@/features/saju-result/model/query";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";

export function SajuResult() {
  const [isResultRevealed, setIsResultRevealed] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: SAJU_RESULT_QUERY_KEY,
    queryFn: fetchSajuResultOnClient,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });
  const { progress, shouldShowPending } = useAnalysisProgress(isLoading);
  const isResultReady = Boolean(data?.data);

  if (shouldShowPending || (isResultReady && !isResultRevealed)) {
    return (
      <AdProgressGate
        progress={isResultReady ? 100 : progress}
        isComplete={isResultReady}
        onRevealResult={() => setIsResultRevealed(true)}
      />
    );
  }

  if (error) {
    return (
      <div className="card-saju-primary p-6 text-sm text-red-600">
        {error instanceof Error
          ? error.message
          : "사주 결과를 불러오지 못했습니다."}
      </div>
    );
  }

  return <SajuPreviewCard dailyResult={data?.data} />;
}
