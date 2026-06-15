"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import type { SajuResponse } from "@/generated/api";
import { fetchSajuTraditionalOnClient } from "@/entities/saju/client/fetchSajuTraditionalOnClient";
import type { ApiEnvelope } from "@/shared/api";
import { useTurnstileErrorRedirect } from "@/shared/hooks/useTurnstileErrorRedirect";

export const JEONGTONGSAJU_QUERY_KEY = ["jeongtongsaju"] as const;

type UseJeongtongsajuOptions = {
  initialData?: ApiEnvelope<SajuResponse | undefined>;
};

export function useJeongtongsaju(options?: UseJeongtongsajuOptions) {
  const authScope = useAuthScope();
  const redirectIfTurnstileRequired = useTurnstileErrorRedirect(
    "/mypage/traditional-fortune",
  );
  const query = useQuery({
    queryKey: [...JEONGTONGSAJU_QUERY_KEY, authScope],
    queryFn: fetchSajuTraditionalOnClient,
    initialData: options?.initialData,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    redirectIfTurnstileRequired(query.error);
  }, [query.error, redirectIfTurnstileRequired]);

  return query;
}
