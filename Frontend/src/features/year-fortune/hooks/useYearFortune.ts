"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchYearFortuneOnClient } from "@/entities/saju/client/fetchYearFortuneOnClient";
import {
  YEAR_FORTUNE_QUERY_KEY,
  toYearFortuneDisplay,
  type YearFortuneDisplay,
} from "@/features/year-fortune/model/yearFortune";

export function useYearFortune() {
  const query = useQuery({
    queryKey: YEAR_FORTUNE_QUERY_KEY,
    queryFn: fetchYearFortuneOnClient,
    staleTime: 0,
    retry: 1,
  });

  const raw = query.data?.success ? query.data : null;
  const backendStatus = raw?.meta?.backendStatus;
  const isPending = backendStatus === "PENDING";

  useEffect(() => {
    if (!isPending) return;

    const timer = window.setInterval(() => {
      query.refetch();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPending, query.refetch]);

  const display: YearFortuneDisplay | null = raw
    ? toYearFortuneDisplay(raw.data ?? undefined, backendStatus)
    : null;

  return {
    isLoading: query.isLoading,
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
