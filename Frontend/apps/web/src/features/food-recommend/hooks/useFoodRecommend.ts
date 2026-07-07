"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
import {
  fetchFoodRecommendOnClient,
  FoodRecommendRequestError,
} from "@/entities/food/client/fetchFoodRecommendOnClient";
import {
  toDisplayFood,
  type DisplayFood,
} from "@/features/food-recommend/model/food-recommend";
import { SAJU_AUTH_REFRESH_PATH } from "@/shared/config/endPoint";
import { useTurnstileErrorRedirect } from "@/shared/hooks/useTurnstileErrorRedirect";

const AUTH_RECOVERY_ERROR_CODES = new Set([
  "FOOD_RECOMMEND_GET_FAILED",
  "LOGIN_REQUIRED",
  "REFRESH_TOKEN_MISSING",
  "TOKEN_REFRESH_FAILED",
]);

export type UseFoodRecommendResult = {
  topFood: DisplayFood | null;
  rankedFoods: DisplayFood[];
  avoidFoods: string[];
  groceryList: string[];
  dailyFiveElements: Record<string, number>;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  canRetryWithRefresh: boolean;
  isRetryingWithRefresh: boolean;
  retryWithRefresh: () => Promise<boolean>;
};

export function useFoodRecommend(): UseFoodRecommendResult {
  const authScope = useAuthScope();
  const redirectIfTurnstileRequired = useTurnstileErrorRedirect("/food");
  const [isRetryingWithRefresh, setIsRetryingWithRefresh] = useState(false);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["food-recommend", authScope],
    queryFn: async () => {
      const result = await fetchFoodRecommendOnClient();
      return result.data ?? null;
    },
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    redirectIfTurnstileRequired(error);
  }, [error, redirectIfTurnstileRequired]);

  const rankedFoods = (data?.rankedFoods ?? []).map(toDisplayFood);
  const canRetryWithRefresh =
    error instanceof FoodRecommendRequestError &&
    error.status === 401 &&
    AUTH_RECOVERY_ERROR_CODES.has(error.code);

  const retryWithRefresh = async () => {
    setIsRetryingWithRefresh(true);

    try {
      const response = await fetch(SAJU_AUTH_REFRESH_PATH, {
        method: "POST",
        cache: "no-store",
      });

      if (!response.ok) {
        return false;
      }

      await refetch();
      return true;
    } finally {
      setIsRetryingWithRefresh(false);
    }
  };

  return {
    topFood: rankedFoods[0] ?? null,
    rankedFoods,
    avoidFoods: data?.avoidFoods ?? [],
    groceryList: data?.groceryList ?? [],
    dailyFiveElements: (data?.dailyFiveElements as Record<string, number>) ?? {},
    isLoading,
    isError,
    errorMessage: error instanceof Error ? error.message : null,
    canRetryWithRefresh,
    isRetryingWithRefresh,
    retryWithRefresh,
  };
}
