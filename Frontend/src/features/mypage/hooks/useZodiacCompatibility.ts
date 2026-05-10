"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchZodiacCompatibilityOnClient } from "@/entities/saju/client/fetchZodiacCompatibilityOnClient";

export const ZODIAC_COMPATIBILITY_QUERY_KEY = ["zodiac-compatibility"] as const;

export function useZodiacCompatibility() {
  return useQuery({
    queryKey: ZODIAC_COMPATIBILITY_QUERY_KEY,
    queryFn: fetchZodiacCompatibilityOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
}
