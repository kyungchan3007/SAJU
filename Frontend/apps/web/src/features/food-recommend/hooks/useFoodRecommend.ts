"use client";

import { useQuery } from "@tanstack/react-query";
import type { Route } from "next";
import { useRouter } from "next/navigation";
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
import {
  buildTurnstileVerifyPath,
  isTurnstileRequiredError,
} from "@/shared/api/auth/turnstileRecovery";

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
  const router = useRouter();
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
    if (!isTurnstileRequiredError(error)) {
      return;
    }

    router.replace(buildTurnstileVerifyPath("/food") as Route);
  }, [error, router]);

  const rankedFoods = (data?.rankedFoods ?? []).map(toDisplayFood);
  const canRetryWithRefresh =
    error instanceof FoodRecommendRequestError &&
    error.status === 401 &&
    AUTH_RECOVERY_ERROR_CODES.has(error.code);

  const retryWithRefresh = async () => {
    setIsRetryingWithRefresh(true);

    try {
      const response = await fetch("/api/auth/refresh", {
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
