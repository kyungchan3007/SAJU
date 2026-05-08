import { NextResponse } from "next/server";

import { logoutOnServer } from "@/entities/auth/server/logoutOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";

export async function POST() {
  const result = await logoutOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("AUTH_LOGOUT_FAILED", result.message),
      { status: result.status },
    );
  }

  const response = NextResponse.json(
    createSuccessResponse({ loggedOut: true }),
  );
  response.cookies.delete(ACCESS_TOKEN_COOKIE_KEY);
  response.cookies.delete(REFRESH_TOKEN_COOKIE_KEY);

  return response;
}
