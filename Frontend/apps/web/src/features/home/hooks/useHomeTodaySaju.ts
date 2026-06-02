"use client";

import { useQuery } from "@tanstack/react-query";

import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { fetchSajuResultOnClient } from "@/entities/saju";
import { SAJU_RESULT_QUERY_KEY } from "@/features/saju-result/model/query";

export function useHomeTodaySaju() {
  const authScope = useAuthScope();
  return useQuery({
    queryKey: [...SAJU_RESULT_QUERY_KEY, authScope],
    queryFn: fetchSajuResultOnClient,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });
}

