import { NextResponse } from "next/server";

import { getPlaceRecommendOnServer } from "@/entities/location/server/getPlaceRecommendOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export const revalidate = 0;

export async function GET() {
  const result = await getPlaceRecommendOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("PLACE_RECOMMEND_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
