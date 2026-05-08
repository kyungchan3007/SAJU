import { NextResponse } from "next/server";

import { deleteMyAccountOnServer } from "@/entities/user/server/deleteMyAccountOnServer";
import { getMyProfileOnServer } from "@/entities/user/server/getMyProfileOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";

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
  response.cookies.delete(ACCESS_TOKEN_COOKIE_KEY);
  response.cookies.delete(REFRESH_TOKEN_COOKIE_KEY);

  return response;
}
