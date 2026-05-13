import { NextResponse } from "next/server";

import { deleteMyAccountOnServer } from "@/entities/user/server/deleteMyAccountOnServer";
import { getMyProfileOnServer } from "@/entities/user/server/getMyProfileOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { clearAuthCookies } from "@/shared/api/auth/clearAuthCookies";

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

export async function DELETE() {
  const result = await deleteMyAccountOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("USER_DELETE_FAILED", result.message),
      { status: result.status },
    );
  }

  const response = NextResponse.json(createSuccessResponse({ deleted: true }));
  clearAuthCookies(response);

  return response;
}
