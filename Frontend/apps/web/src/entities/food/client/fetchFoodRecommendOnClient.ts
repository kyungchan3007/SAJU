import type { FoodRecommendResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export class FoodRecommendRequestError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "FoodRecommendRequestError";
  }
}

export async function fetchFoodRecommendOnClient(): Promise<
  ApiEnvelope<FoodRecommendResponse | undefined>
> {
  const response = await fetch("/api/food/recommend", { method: "GET" });
  const result = (await response.json()) as ApiEnvelope<
    FoodRecommendResponse | undefined
  >;

  if (!response.ok) {
    throw new FoodRecommendRequestError(
      result.success
        ? "Failed to fetch food recommendation."
        : result.error.message,
      result.success ? "FOOD_RECOMMEND_GET_FAILED" : result.error.code,
      response.status,
    );
  }

  return result;
}
