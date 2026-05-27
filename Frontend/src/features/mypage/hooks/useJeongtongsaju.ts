"use client";

import { useQuery } from "@tanstack/react-query";
import type { SajuResponse } from "@/generated/api";
import { fetchSajuTraditionalOnClient } from "@/entities/saju/client/fetchSajuTraditionalOnClient";
import type { ApiEnvelope } from "@/shared/api";

export const JEONGTONGSAJU_QUERY_KEY = ["jeongtongsaju"] as const;

type UseJeongtongsajuOptions = {
  initialData?: ApiEnvelope<SajuResponse | undefined>;
};

export function useJeongtongsaju(options?: UseJeongtongsajuOptions) {
  return useQuery({
    queryKey: JEONGTONGSAJU_QUERY_KEY,
    queryFn: fetchSajuTraditionalOnClient,
    initialData: options?.initialData,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
}
