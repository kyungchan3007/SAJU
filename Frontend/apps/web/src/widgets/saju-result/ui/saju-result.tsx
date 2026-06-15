import type { Route } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { SajuPreviewCard } from "@/domain/saju/guid-card/preview-card/ui/saju-preview-card";
import { getSajuProfileOnServer } from "@/entities/saju/server/getSajuProfileOnServer";
import { getSajuResultOnServer } from "@/entities/saju/server/getSajuResultOnServer";
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

export async function SajuResult({ nextPath }: SajuResultProps) {
  const result = await getSajuResultOnServer();
  const loginPath = buildLoginPath(buildSajuResultPath(nextPath));

  if (!result.success) {
    if (result.reason === "LOGIN_REQUIRED" || result.status === 401) {
      return <AuthRefreshRetry loginPath={loginPath} />;
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

    redirect(buildErrorPagePath({ code: "SAJU_RESULT_LOAD_FAILED" }) as Route);
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
