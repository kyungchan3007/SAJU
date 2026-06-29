"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchSajuProfileOnClient } from "@/entities/saju";
import { SAJU_PROFILE_QUERY_KEY } from "@/features/saju-profile/model/query";
import { useSajuResultQuery } from "@/features/saju-result/hooks/useSajuResultQuery";
import {
  isSajuResultLoginRequiredError,
  isSajuResultPendingFormRequiredError,
} from "@/features/saju-result/model/errors";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { buildErrorPagePath } from "@/shared/lib/error-page";
import {
  buildLoginPath,
  buildSajuInputPath,
  buildSajuResultPath,
} from "@/shared/lib/internalRedirect";

type UseSajuResultParams = {
  nextPath?: Route | null;
};

export function useSajuResult({ nextPath }: UseSajuResultParams) {
  const router = useRouter();
  const authScope = useAuthScope();
  const resultPath = buildSajuResultPath(nextPath);
  const loginPath = buildLoginPath(resultPath);
  const inputPath = buildSajuInputPath(nextPath);
  const resultQuery = useSajuResultQuery(resultPath);
  const profileQuery = useQuery({
    queryKey: [...SAJU_PROFILE_QUERY_KEY, authScope],
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

  const isLoginRequired = Boolean(
    resultQuery.error && isSajuResultLoginRequiredError(resultQuery.error),
  );
  const isPendingFormRequired = Boolean(
    resultQuery.error && isSajuResultPendingFormRequiredError(resultQuery.error),
  );
  const hasRedirectableError = Boolean(
    resultQuery.error && !isLoginRequired && !isPendingFormRequired,
  );

  useEffect(() => {
    if (!hasRedirectableError) {
      return;
    }

    router.replace(
      buildErrorPagePath({ code: "SAJU_RESULT_LOAD_FAILED" }) as Route,
    );
  }, [hasRedirectableError, router]);

  return {
    dailyResult: resultQuery.data?.data,
    inputPath,
    isLoading:
      resultQuery.isPending || (resultQuery.isSuccess && Boolean(nextPath)),
    isLoginRequired,
    isPendingFormRequired,
    loginPath,
    profile: profileQuery.data?.success ? (profileQuery.data.data ?? null) : null,
  };
}
