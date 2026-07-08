import { NextResponse } from "next/server";

import { getCurrentOpenCohortOnServer } from "@/entities/community/server/getCurrentOpenCohortOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export const revalidate = 0;

export async function GET() {
  const result = await getCurrentOpenCohortOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("COMMUNITY_CURRENT_COHORT_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
