"use client";

import type { Route } from "next";

import { useSajuHub } from "@/features/saju-hub/hooks/useSajuHub";
import { SajuHubCard } from "@/features/saju-hub/ui/saju-hub-card";
import { AnalysisPendingGate } from "@/features/saju-result";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";

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
    return <AnalysisPendingGate />;
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
