import Link from "next/link";
import type { Route } from "next";
import { redirect } from "next/navigation";

import { SajuPreviewCard } from "@/domain/saju/guid-card/preview-card/ui/saju-preview-card";
import { getSajuProfileOnServer } from "@/entities/saju/server/getSajuProfileOnServer";
import { getSajuResultOnServer } from "@/entities/saju/server/getSajuResultOnServer";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { RewardedResultGate } from "@/features/saju-result/ui/rewarded-result-gate.client";
import { buildSajuInputPath } from "@/shared/lib/internalRedirect";
import { Button, EmptyStateCard, ErrorStateCard } from "@/shared/ui";

type SajuResultProps = {
  nextPath?: Route | null;
};

export async function SajuResult({ nextPath }: SajuResultProps) {
  const result = await getSajuResultOnServer();

  if (!result.success) {
    if (result.reason === "LOGIN_REQUIRED") {
      return <AuthRefreshRetry />;
    }

    if (result.reason === "PENDING_FORM_REQUIRED") {
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

    return (
      <ErrorStateCard
        title="사주 결과를 불러오지 못했습니다"
        description={result.message || "잠시 후 다시 시도해 주세요."}
        action={
          <Button asChild size="sm" className="rounded-full">
            <Link href={buildSajuInputPath(nextPath)}>
              사주 입력 화면으로 이동
            </Link>
          </Button>
        }
      />
    );
  }

  if (nextPath && nextPath !== "/saju/result") {
    redirect(nextPath);
  }

  const profile = await getSajuProfileOnServer({
    refreshOnUnauthorized: false,
  });

  return (
    <RewardedResultGate>
      <SajuPreviewCard
        dailyResult={result.data}
        profile={profile.success ? profile.data : null}
      />
    </RewardedResultGate>
  );
}
