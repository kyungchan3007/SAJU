"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { SAJU_RESULT_QUERY_KEY } from "@/features/saju-result/model/query";
import type { ApiEnvelope } from "@/shared/api";

async function fetchSajuResult(): Promise<ApiEnvelope<unknown>> {
  const response = await fetch("/api/saju/result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = (await response.json()) as ApiEnvelope<unknown>;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to fetch saju result." : result.error.message,
    );
  }

  return result;
}

export function useSajuResultGate() {
  const queryClient = useQueryClient();
  const hasCachedResult = Boolean(
    queryClient.getQueryData<ApiEnvelope<unknown>>(SAJU_RESULT_QUERY_KEY),
  );
  const [isLoading, setIsLoading] = useState(!hasCachedResult);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (hasCachedResult) {
      return;
    }

    const load = async () => {
      try {
        const result = await fetchSajuResult();
        if (cancelled) {
          return;
        }
        queryClient.setQueryData(SAJU_RESULT_QUERY_KEY, result);
        setIsLoading(false);
      } catch (error) {
        if (cancelled) {
          return;
        }
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "사주 결과를 불러오지 못했습니다.",
        );
        setIsLoading(false);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [hasCachedResult, queryClient]);

  return {
    isLoading,
    errorMessage,
  };
}
