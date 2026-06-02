import { NextResponse } from "next/server";

import { getCommunityInterestsOnServer } from "@/entities/community/server/getCommunityInterestsOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export const revalidate = 0;

export async function GET() {
  const result = await getCommunityInterestsOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("COMMUNITY_INTERESTS_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
