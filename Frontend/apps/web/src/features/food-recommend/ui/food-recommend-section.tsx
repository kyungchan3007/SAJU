"use client";

import { useFoodRecommendSection } from "@/features/food-recommend/hooks/useFoodRecommendSection";
import { FoodRecommendContent } from "@/features/food-recommend/ui/food-recommend-content";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";
import { Button, EmptyStateCard, ErrorStateCard } from "@/shared/ui";
import {
  FortuneGateLayout,
  FortunePageLayout,
} from "@/shared/ui/fortune-page-layout";

export function FoodRecommendSection() {
  const {
    topFood,
    rankedFoods,
    avoidFoods,
    groceryList,
    isError,
    errorMessage,
    isRetryingWithRefresh,
    contextViewModel,
    isContentReady,
    adGate,
    handleRetry,
  } = useFoodRecommendSection();

  if (adGate.shouldShowGate && !isError) {
    return (
      <FortuneGateLayout>
        <AdProgressGate
          progress={isContentReady ? 100 : 80}
          isComplete={isContentReady}
          onRevealResult={adGate.unlock}
          revealButtonLabel="오늘의 메뉴 보기"
        />
      </FortuneGateLayout>
    );
  }

  if (isError) {
    return (
      <FortunePageLayout>
        <ErrorStateCard
          title="메뉴 추천을 불러오지 못했어요"
          description={errorMessage ?? "잠시 후 다시 확인해 주세요."}
          action={
            <Button
              size="sm"
              className="rounded-full"
              onClick={() => void handleRetry()}
              disabled={isRetryingWithRefresh}
            >
              {isRetryingWithRefresh ? "인증 확인 중..." : "다시 확인하기"}
            </Button>
          }
        />
      </FortunePageLayout>
    );
  }

  if (!topFood) {
    return (
      <FortunePageLayout>
        <EmptyStateCard
          title="추천 메뉴가 없습니다"
          description="오늘의 메뉴 데이터가 준비되면 이곳에서 확인할 수 있어요"
        />
      </FortunePageLayout>
    );
  }

  return (
    <FortunePageLayout>
      <FoodRecommendContent
        topFood={topFood}
        rankedFoods={rankedFoods}
        avoidFoods={avoidFoods}
        groceryList={groceryList}
        contextViewModel={contextViewModel}
      />
    </FortunePageLayout>
  );
}
