"use client";

import { useQuery } from "@tanstack/react-query";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";
import { AnalysisPendingGate } from "@/features/saju-result/ui/analysis-pending-gate.client";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/saju-profile/model/query";
import { RedirectToError } from "@/shared/app-infra/navigation/redirect-to-error.client";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { buildSajuInputPath } from "@/shared/lib/internalRedirect";

type ProtectedSajuServiceGateProps = {
  servicePath: Route;
  children: ReactNode;
};

export function ProtectedSajuServiceGate({
  servicePath,
  children,
}: ProtectedSajuServiceGateProps) {
  const authScope = useAuthScope();
  const router = useRouter();
  const query = useQuery({
    queryKey: [...SAJU_PROFILE_QUERY_KEY, authScope],
    queryFn: fetchSajuProfileOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const profile = query.data?.success ? query.data.data : null;
  const needsSajuProfile = query.isSuccess && !profile?.sajuAnalysis;

  useEffect(() => {
    if (!needsSajuProfile) {
      return;
    }

    router.replace(buildSajuInputPath(servicePath, { forceInput: true }));
  }, [needsSajuProfile, router, servicePath]);

  if (query.isLoading || needsSajuProfile) {
    return <AnalysisPendingGate />;
  }

  if (query.isError) {
    return <RedirectToError code="SAJU_PROFILE_LOAD_FAILED" />;
  }

  return <>{children}</>;
}
