"use client";

import type { Route } from "next";
import Link from "next/link";

import { SajuPreviewCard } from "@/domain/saju/guid-card/preview-card/ui/saju-preview-card";
import { useSajuResult } from "@/features/saju-result/hooks/useSajuResult";
import { AnalysisPendingGate } from "@/features/saju-result/ui/analysis-pending-gate.client";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { RewardedResultGate } from "@/features/saju-result/ui/rewarded-result-gate.client";
import { Button, EmptyStateCard } from "@/shared/ui";
import { MESSAGES } from "@/shared/constants/messages";

type SajuResultProps = {
  nextPath?: Route | null;
};

export function SajuResult({ nextPath }: SajuResultProps) {
  const {
    dailyResult,
    inputPath,
    isLoading,
    isLoginRequired,
    isPendingFormRequired,
    loginPath,
    profile,
  } = useSajuResult({ nextPath });

  if (isLoading) {
    return <AnalysisPendingGate />;
  }

  if (isLoginRequired) {
    return <AuthRefreshRetry loginPath={loginPath} />;
  }

  if (isPendingFormRequired) {
    return (
      <EmptyStateCard
        title={MESSAGES.SAJU_NOT_FOUND}
        description="오늘의 운세를 보려면 먼저 사주 정보를 입력해 주세요."
        action={
          <Button asChild size="sm" className="rounded-full">
            <Link href={inputPath}>사주 입력하기</Link>
          </Button>
        }
      />
    );
  }

  return (
    <RewardedResultGate>
      <SajuPreviewCard dailyResult={dailyResult} profile={profile} />
    </RewardedResultGate>
  );
}
