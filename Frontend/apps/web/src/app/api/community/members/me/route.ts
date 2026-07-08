import { NextResponse } from "next/server";

import { getMyMembershipsOnServer } from "@/entities/community/server/getMyMembershipsOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export const revalidate = 0;

export async function GET() {
  const result = await getMyMembershipsOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("COMMUNITY_MEMBERSHIPS_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
