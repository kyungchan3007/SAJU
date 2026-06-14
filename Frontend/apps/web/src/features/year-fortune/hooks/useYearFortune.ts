"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Route } from "next";
import { useRouter } from "next/navigation";

import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { fetchYearFortuneOnClient } from "@/entities/saju/client/fetchYearFortuneOnClient";
import {
  YEAR_FORTUNE_QUERY_KEY,
  resolveYearFortuneStatus,
  toYearFortuneDisplay,
  type YearFortuneDisplay,
} from "@/features/year-fortune/model/yearFortune";
import {
  buildTurnstileVerifyPath,
  isTurnstileRequiredError,
} from "@/shared/api/auth/turnstileRecovery";

export function useYearFortune() {
  const authScope = useAuthScope();
  const router = useRouter();
  const query = useQuery({
    queryKey: [...YEAR_FORTUNE_QUERY_KEY, authScope],
    queryFn: fetchYearFortuneOnClient,
    staleTime: 0,
    retry: 1,
  });
  const { refetch } = query;

  const raw = query.data?.success ? query.data : null;
  const yearFortuneStatus = resolveYearFortuneStatus(
    raw?.meta?.backendStatus,
    raw?.data && typeof raw.data === "object" && "status" in raw.data
      ? (raw.data.status as string | undefined)
      : undefined,
  );
  const isPending = yearFortuneStatus === "PENDING";

  useEffect(() => {
    if (!isPending) return;

    const timer = window.setInterval(() => {
      refetch();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPending, refetch]);

  useEffect(() => {
    if (!isTurnstileRequiredError(query.error)) {
      return;
    }

    router.replace(buildTurnstileVerifyPath("/mypage/year-fortune") as Route);
  }, [query.error, router]);

  const display: YearFortuneDisplay | null = raw
    ? toYearFortuneDisplay(raw.data ?? undefined, raw?.meta?.backendStatus)
    : null;

  return {
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    errorMessage: query.isError
      ? query.error instanceof Error
        ? query.error.message
        : "신년운세 조회에 실패했어요."
      : null,
    isPending,
    display,
  };
}
