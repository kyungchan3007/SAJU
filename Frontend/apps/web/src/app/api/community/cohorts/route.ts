import { NextResponse } from "next/server";

import { getCommunityCohortsOnServer } from "@/entities/community/server/getCommunityCohortsOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export const revalidate = 0;

export async function GET() {
  const result = await getCommunityCohortsOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("COMMUNITY_COHORTS_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
