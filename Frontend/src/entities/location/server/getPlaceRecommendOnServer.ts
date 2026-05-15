import "server-only";

import type { PlaceRecommendResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_PLACE_RECOMMEND_ENDPOINT_PATH } from "@/shared/config/endPoint";

type GetPlaceRecommendOnServerSuccess = {
  success: true;
  data: PlaceRecommendResponse | undefined;
};

type GetPlaceRecommendOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetPlaceRecommendOnServerResult =
  | GetPlaceRecommendOnServerSuccess
  | GetPlaceRecommendOnServerFailure;

export async function getPlaceRecommendOnServer(): Promise<GetPlaceRecommendOnServerResult> {
  const result = await authenticatedBackendFetch(
    SAJU_PLACE_RECOMMEND_ENDPOINT_PATH,
    {
      method: "GET",
    },
  );

  const parsed = await parseBackendApiResponse<PlaceRecommendResponse>(
    result.response,
    "Get place recommendation request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
