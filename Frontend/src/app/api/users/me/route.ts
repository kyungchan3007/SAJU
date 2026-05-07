import { NextResponse } from "next/server";

import { getMyProfileOnServer } from "@/entities/user/server/getMyProfileOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export async function GET() {
  const result = await getMyProfileOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("USER_PROFILE_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
