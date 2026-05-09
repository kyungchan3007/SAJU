"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSajuTraditionalOnClient } from "@/entities/saju/client/fetchSajuTraditionalOnClient";

export const JEONGTONGSAJU_QUERY_KEY = ["jeongtongsaju"] as const;

export function useJeongtongsaju() {
  return useQuery({
    queryKey: JEONGTONGSAJU_QUERY_KEY,
    queryFn: fetchSajuTraditionalOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
}
