"use client";

import { useQuery } from "@tanstack/react-query";
import type { TraditionalFortuneResponse } from "@/generated/api";
import { fetchTraditionalFortuneOnClient } from "@/entities/saju/client/fetchTraditionalFortuneOnClient";
import { toDomainDisplayList } from "@/features/traditional-fortune/model/traditionalFortune";
import type { ApiEnvelope } from "@/shared/api";

export const TRADITIONAL_FORTUNE_QUERY_KEY = ["traditional-fortune"] as const;

type UseTraditionalFortuneOptions = {
  initialData?: ApiEnvelope<TraditionalFortuneResponse | undefined>;
};

export function useTraditionalFortune(options?: UseTraditionalFortuneOptions) {
  const query = useQuery({
    queryKey: TRADITIONAL_FORTUNE_QUERY_KEY,
    queryFn: fetchTraditionalFortuneOnClient,
    initialData: options?.initialData,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const apiErrorMessage =
    query.data && !query.data.success ? query.data.error.message : null;
  const data = query.data?.success ? query.data.data : null;
  const domains = data ? toDomainDisplayList(data) : [];

  return {
    isLoading: query.isLoading,
    isError: query.isError || Boolean(apiErrorMessage),
    errorMessage: query.isError
      ? query.error instanceof Error
        ? query.error.message
        : "데이터를 불러오지 못했어요."
      : apiErrorMessage,
    data,
    domains,
  };
}
