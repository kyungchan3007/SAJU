import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { refreshTokenOnServer } from "@/entities/auth/server/refreshTokenOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  AUTH_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_KEY)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      createErrorResponse("REFRESH_TOKEN_MISSING", "Refresh token is missing."),
      { status: 401 },
    );
  }

  const refreshed = await refreshTokenOnServer(refreshToken);

  if (!refreshed.success) {
    const response = NextResponse.json(
      createErrorResponse("TOKEN_REFRESH_FAILED", refreshed.message),
      { status: refreshed.status },
    );

    response.cookies.delete(ACCESS_TOKEN_COOKIE_KEY);
    response.cookies.delete(REFRESH_TOKEN_COOKIE_KEY);

    return response;
  }

  const response = NextResponse.json(
    createSuccessResponse({ refreshed: true }),
  );

  response.cookies.set(ACCESS_TOKEN_COOKIE_KEY, refreshed.data.accessToken, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 60 * 60,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE_KEY, refreshed.data.refreshToken, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 60 * 60,
  });

  return response;
}
