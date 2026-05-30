import "server-only";

import type { FoodRecommendResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { FOOD_RECOMMEND_ENDPOINT_PATH } from "@/shared/config/endPoint";

type GetFoodRecommendOnServerSuccess = {
  success: true;
  data: FoodRecommendResponse | undefined;
};

type GetFoodRecommendOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetFoodRecommendOnServerResult =
  | GetFoodRecommendOnServerSuccess
  | GetFoodRecommendOnServerFailure;

type GetFoodRecommendOnServerOptions = {
  refreshOnUnauthorized?: boolean;
};

export async function getFoodRecommendOnServer({
  refreshOnUnauthorized = true,
}: GetFoodRecommendOnServerOptions = {}): Promise<GetFoodRecommendOnServerResult> {
  const result = await authenticatedBackendFetch(
    FOOD_RECOMMEND_ENDPOINT_PATH,
    {
      method: "GET",
    },
    { refreshOnUnauthorized },
  );

  const parsed = await parseBackendApiResponse<FoodRecommendResponse>(
    result.response,
    "Get food recommendation request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
