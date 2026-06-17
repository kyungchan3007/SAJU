import { type NextRequest, NextResponse } from "next/server";
import { createOAuthState } from "@/shared/api/auth/oauthState";
import { getServerEnv } from "@/shared/config/env";
import {
  AUTH_COOKIE_OPTIONS,
  OAUTH_STATE_COOKIE_KEY,
  OAUTH_STATE_COOKIE_MAX_AGE,
} from "@/shared/config/authToken";
import { KAKAO_AUTH_BACKEND_ENDPOINT } from "@/shared/config/endPoint";

export async function GET(request: NextRequest) {
  const { BACKEND_API_BASE_URL } = getServerEnv();

  if (!BACKEND_API_BASE_URL) {
    return NextResponse.json({ success: false, message: "CONFIG_ERROR" }, { status: 500 });
  }

  const backendUrl = new URL(KAKAO_AUTH_BACKEND_ENDPOINT, BACKEND_API_BASE_URL);

  let backendResponse: Response;
  try {
    backendResponse = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      redirect: "manual",
    });
  } catch {
    return NextResponse.json({ success: false, message: "BACKEND_UNAVAILABLE" }, { status: 502 });
  }

  const kakaoRedirectUrl = backendResponse.headers.get("location");
  if (!kakaoRedirectUrl) {
    return NextResponse.json({ success: false, message: "NO_REDIRECT_URL" }, { status: 502 });
  }

  const state = createOAuthState();
  const urlWithState = new URL(kakaoRedirectUrl);
  urlWithState.searchParams.set("state", state);

  const response = NextResponse.redirect(urlWithState.toString());
  response.cookies.set(OAUTH_STATE_COOKIE_KEY, state, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: OAUTH_STATE_COOKIE_MAX_AGE,
  });

  return response;
}
