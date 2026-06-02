import { FortunePageLayout } from "@/shared/ui/fortune-page-layout";
import { FoodRecommendSection } from "@/features/food-recommend/ui/food-recommend-section";

export function FoodRecommendWidget() {
  return (
    <FortunePageLayout>
      <FoodRecommendSection />
    </FortunePageLayout>
  );
}
