"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { fetchZodiacCompatibilityOnClient } from "@/entities/saju/client/fetchZodiacCompatibilityOnClient";

export const ZODIAC_COMPATIBILITY_QUERY_KEY = ["zodiac-compatibility"] as const;

export function useZodiacCompatibility() {
  const authScope = useAuthScope();
  return useQuery({
    queryKey: [...ZODIAC_COMPATIBILITY_QUERY_KEY, authScope],
    queryFn: fetchZodiacCompatibilityOnClient,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });
}
