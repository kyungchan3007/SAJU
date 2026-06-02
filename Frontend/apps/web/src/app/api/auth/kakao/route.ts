import { NextRequest, NextResponse } from "next/server";

import { createErrorResponse } from "@/shared/api";
import { normalizePostLoginRedirect } from "@/shared/api/auth/postLoginRedirect";
import { getServerEnv } from "@/shared/config";
import {
  AUTH_COOKIE_OPTIONS,
  POST_LOGIN_REDIRECT_COOKIE_KEY,
  POST_LOGIN_REDIRECT_COOKIE_MAX_AGE,
} from "@/shared/config/authToken";
import { KAKAO_LOGIN_URL } from "@/shared/config/endPoint";
export async function GET(request: NextRequest) {
  const { BACKEND_API_BASE_URL } = getServerEnv();
  const nextPath = normalizePostLoginRedirect(
    request.nextUrl.searchParams.get("next"),
  );

  if (!BACKEND_API_BASE_URL) {
    return NextResponse.json(
      createErrorResponse(
        "CONFIG_ERROR",
        "BACKEND_API_BASE_URL is not configured.",
      ),
      { status: 500 },
    );
  }

  const backendUrl = new URL(KAKAO_LOGIN_URL, BACKEND_API_BASE_URL);

  let backendResponse: Response;
  try {
    backendResponse = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      redirect: "manual",
    });
  } catch {
    return NextResponse.json(
      createErrorResponse(
        "BACKEND_UNAVAILABLE",
        "Unable to reach backend auth endpoint.",
      ),
      { status: 502 },
    );
  }

  if (backendResponse.status >= 300 && backendResponse.status < 400) {
    const locationHeader = backendResponse.headers.get("location");

    if (!locationHeader) {
      return NextResponse.json(
        createErrorResponse(
          "KAKAO_AUTH_FAILED",
          "Backend auth redirect is missing Location header.",
        ),
        { status: 502 },
      );
    }

    const redirectUrl = new URL(locationHeader, BACKEND_API_BASE_URL);
    const response = NextResponse.redirect(redirectUrl);

    if (nextPath) {
      response.cookies.set(POST_LOGIN_REDIRECT_COOKIE_KEY, nextPath, {
        ...AUTH_COOKIE_OPTIONS,
        maxAge: POST_LOGIN_REDIRECT_COOKIE_MAX_AGE,
      });
    }

    return response;
  }

  return NextResponse.json(
    createErrorResponse(
      "KAKAO_AUTH_FAILED",
      `Backend auth request failed with status ${backendResponse.status}.`,
    ),
    { status: backendResponse.status },
  );
}
