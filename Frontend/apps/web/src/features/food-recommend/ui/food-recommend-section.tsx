"use client";

import { useFoodRecommendSection } from "@/features/food-recommend/hooks/useFoodRecommendSection";
import { FoodRecommendContent } from "@/features/food-recommend/ui/food-recommend-content";
import { RedirectToError } from "@/shared/app-infra/navigation/redirect-to-error.client";
import { AdProgressGate } from "@/shared/ui/ad-progress-gate.client";
import { EmptyStateCard } from "@/shared/ui";
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
    contextViewModel,
    isContentReady,
    adGate,
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
    return <RedirectToError code="FOOD_RECOMMEND_LOAD_FAILED" />;
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
