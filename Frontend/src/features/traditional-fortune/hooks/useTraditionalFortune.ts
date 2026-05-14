"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTraditionalFortuneOnClient } from "@/entities/saju/client/fetchTraditionalFortuneOnClient";
import { toDomainDisplayList } from "@/features/traditional-fortune/model/traditionalFortune";

export const TRADITIONAL_FORTUNE_QUERY_KEY = ["traditional-fortune"] as const;

export function useTraditionalFortune() {
  const query = useQuery({
    queryKey: TRADITIONAL_FORTUNE_QUERY_KEY,
    queryFn: fetchTraditionalFortuneOnClient,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const data = query.data?.success ? query.data.data : null;
  const domains = data ? toDomainDisplayList(data) : [];

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    errorMessage: query.isError
      ? (query.error instanceof Error
          ? query.error.message
          : "데이터를 불러오지 못했어요.")
      : null,
    data,
    domains,
  };
}
