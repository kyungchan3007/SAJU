"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { fetchSajuResultOnClient } from "@/entities/saju";
import { SAJU_RESULT_QUERY_KEY } from "@/features/saju-result/model/query";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import { useTurnstileErrorRedirect } from "@/shared/hooks/useTurnstileErrorRedirect";

export function useSajuResultQuery(returnTo: string) {
  const authScope = useAuthScope();
  const redirectIfTurnstileRequired = useTurnstileErrorRedirect(returnTo);
  const query = useQuery({
    queryKey: [...SAJU_RESULT_QUERY_KEY, authScope],
    queryFn: fetchSajuResultOnClient,
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    redirectIfTurnstileRequired(query.error);
  }, [query.error, redirectIfTurnstileRequired]);

  return query;
}
