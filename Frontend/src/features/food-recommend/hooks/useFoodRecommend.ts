"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchFoodRecommendOnClient } from "@/entities/food/client/fetchFoodRecommendOnClient";
import {
  toDisplayFood,
  type DisplayFood,
} from "@/features/food-recommend/model/food-recommend";

export type UseFoodRecommendResult = {
  topFood: DisplayFood | null;
  rankedFoods: DisplayFood[];
  avoidFoods: string[];
  groceryList: string[];
  dailyFiveElements: Record<string, number>;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
};

export function useFoodRecommend(): UseFoodRecommendResult {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["food-recommend"],
    queryFn: async () => {
      const result = await fetchFoodRecommendOnClient();
      return result.data ?? null;
    },
    staleTime: 1000 * 60 * 10,
  });

  const rankedFoods = (data?.rankedFoods ?? []).map(toDisplayFood);

  return {
    topFood: rankedFoods[0] ?? null,
    rankedFoods,
    avoidFoods: data?.avoidFoods ?? [],
    groceryList: data?.groceryList ?? [],
    dailyFiveElements: (data?.dailyFiveElements as Record<string, number>) ?? {},
    isLoading,
    isError,
    errorMessage: error instanceof Error ? error.message : null,
  };
}
