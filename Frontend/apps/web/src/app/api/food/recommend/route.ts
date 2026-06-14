import { NextResponse } from "next/server";

import { getFoodRecommendOnServer } from "@/entities/food/server/getFoodRecommendOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { withApiGuards } from "@/shared/api/auth/withApiGuards";

export const revalidate = 0;

export const GET = withApiGuards({ requireTurnstile: true }, async () => {
  const result = await getFoodRecommendOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("FOOD_RECOMMEND_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
});
