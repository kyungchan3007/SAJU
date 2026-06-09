"use client";

import { useRouter } from "next/navigation";

import { useFoodRecommend } from "@/features/food-recommend/hooks/useFoodRecommend";
import { getFoodContextViewModel } from "@/features/food-recommend/model/food-recommend";
import { useAdGate } from "@/shared/hooks/use-ad-gate";

export function useFoodRecommendSection() {
  const router = useRouter();
  const foodRecommend = useFoodRecommend();
  const contextViewModel = getFoodContextViewModel(
    foodRecommend.dailyFiveElements,
  );
  const isContentReady = !foodRecommend.isLoading && !foodRecommend.isError;
  const adGate = useAdGate({ enabled: true, isContentReady });

  const handleRetry = async () => {
    if (foodRecommend.canRetryWithRefresh) {
      const refreshed = await foodRecommend.retryWithRefresh();

      if (!refreshed) {
        router.replace("/login");
      }

      return;
    }

    router.refresh();
  };

  return {
    ...foodRecommend,
    contextViewModel,
    isContentReady,
    adGate,
    handleRetry,
  };
}
