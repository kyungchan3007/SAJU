"use client";

import type { Route } from "next";
import Link from "next/link";

import { useSajuHub } from "@/features/saju-hub/hooks/useSajuHub";
import { SajuHubCard } from "@/features/saju-hub/ui/saju-hub-card";
import { AnalysisPendingGate } from "@/features/saju-result";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { Button, EmptyStateCard } from "@/shared/ui";
import { MESSAGES } from "@/shared/constants/messages";

type SajuHubProps = {
  nextPath?: Route | null;
};

export function SajuHub({ nextPath }: SajuHubProps) {
  const hub = useSajuHub({ nextPath });

  if (hub.isPending) {
    return <AnalysisPendingGate />;
  }

  if (hub.isLoginRequired) {
    return <AuthRefreshRetry loginPath={hub.loginPath} />;
  }

  if (hub.isPendingFormRequired) {
    return (
      <EmptyStateCard
        title={MESSAGES.SAJU_NOT_FOUND}
        description="허브를 보려면 먼저 사주 정보를 입력해 주세요."
        action={
          <Button asChild size="sm" className="rounded-full">
            <Link href={hub.inputPath}>사주 입력하기</Link>
          </Button>
        }
      />
    );
  }

  if (!hub.isSuccess) {
    return <AnalysisPendingGate />;
  }

  return (
    <SajuHubCard
      copy={hub.copy}
      onCommunityClick={hub.onCommunityClick}
      onResultClick={hub.onResultClick}
    />
  );
}
