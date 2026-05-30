import type { FoodRecommendResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function fetchFoodRecommendOnClient(): Promise<
  ApiEnvelope<FoodRecommendResponse | undefined>
> {
  const response = await fetch("/api/food/recommend", { method: "GET" });
  const result = (await response.json()) as ApiEnvelope<
    FoodRecommendResponse | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success
        ? "Failed to fetch food recommendation."
        : result.error.message,
    );
  }

  return result;
}
