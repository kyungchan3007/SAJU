"use client";

import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { SajuPreviewCard } from "@/domain/saju/guid-card/preview-card/ui/saju-preview-card";
import { fetchSajuProfileOnClient } from "@/entities/saju";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/saju-profile/model/query";
import {
  isSajuResultLoginRequiredError,
  isSajuResultPendingFormRequiredError,
} from "@/features/saju-result/model/errors";
import { useSajuResultQuery } from "@/features/saju-result/hooks/useSajuResultQuery";
import { AnalysisPendingGate } from "@/features/saju-result/ui/analysis-pending-gate.client";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { RewardedResultGate } from "@/features/saju-result/ui/rewarded-result-gate.client";
import { buildErrorPagePath } from "@/shared/lib/error-page";
import {
  buildLoginPath,
  buildSajuInputPath,
  buildSajuResultPath,
} from "@/shared/lib/internalRedirect";
import { Button, EmptyStateCard } from "@/shared/ui";

type SajuResultProps = {
  nextPath?: Route | null;
};

export function SajuResult({ nextPath }: SajuResultProps) {
  const router = useRouter();
  const resultPath = buildSajuResultPath(nextPath);
  const loginPath = buildLoginPath(resultPath);
  const resultQuery = useSajuResultQuery(resultPath);
  const profileQuery = useQuery({
    queryKey: SAJU_PROFILE_QUERY_KEY,
    queryFn: fetchSajuProfileOnClient,
    enabled: resultQuery.isSuccess,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  useEffect(() => {
    if (!resultQuery.isSuccess) {
      return;
    }

    if (nextPath && nextPath !== "/saju/result") {
      router.replace(nextPath);
    }
  }, [nextPath, resultQuery.isSuccess, router]);

  useEffect(() => {
    if (
      !resultQuery.error ||
      isSajuResultLoginRequiredError(resultQuery.error) ||
      isSajuResultPendingFormRequiredError(resultQuery.error)
    ) {
      return;
    }

    router.replace(
      buildErrorPagePath({ code: "SAJU_RESULT_LOAD_FAILED" }) as Route,
    );
  }, [resultQuery.error, router]);

  if (resultQuery.isPending || (resultQuery.isSuccess && nextPath)) {
    return <AnalysisPendingGate />;
  }

  if (resultQuery.error) {
    if (isSajuResultLoginRequiredError(resultQuery.error)) {
      return <AuthRefreshRetry loginPath={loginPath} />;
    }

    if (isSajuResultPendingFormRequiredError(resultQuery.error)) {
      return (
        <EmptyStateCard
          title="사주 정보가 없습니다"
          description="오늘의 운세를 보려면 먼저 사주 정보를 입력해 주세요."
          action={
            <Button asChild size="sm" className="rounded-full">
              <Link href={buildSajuInputPath(nextPath)}>사주 입력하기</Link>
            </Button>
          }
        />
      );
    }

    return <AnalysisPendingGate />;
  }

  const dailyResult = resultQuery.data?.data;
  const profile = profileQuery.data?.success
    ? (profileQuery.data.data ?? null)
    : null;

  return (
    <RewardedResultGate>
      <SajuPreviewCard dailyResult={dailyResult} profile={profile} />
    </RewardedResultGate>
  );
}
