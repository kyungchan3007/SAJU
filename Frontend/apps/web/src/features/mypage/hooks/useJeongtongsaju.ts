"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import type { SajuResponse } from "@/generated/api";
import { fetchSajuTraditionalOnClient } from "@/entities/saju/client/fetchSajuTraditionalOnClient";
import type { ApiEnvelope } from "@/shared/api";

export const JEONGTONGSAJU_QUERY_KEY = ["jeongtongsaju"] as const;

type UseJeongtongsajuOptions = {
  initialData?: ApiEnvelope<SajuResponse | undefined>;
};

export function useJeongtongsaju(options?: UseJeongtongsajuOptions) {
  const authScope = useAuthScope();
  return useQuery({
    queryKey: [...JEONGTONGSAJU_QUERY_KEY, authScope],
    queryFn: fetchSajuTraditionalOnClient,
    initialData: options?.initialData,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
}
