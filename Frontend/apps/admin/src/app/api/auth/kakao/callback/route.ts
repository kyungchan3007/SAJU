import { type NextRequest, NextResponse } from "next/server";
import { exchangeOAuthCodeOnServer } from "@/shared/api/auth/exchangeOAuthCodeOnServer";
import { isOAuthStateValid } from "@/shared/api/auth/oauthState";
import { getServerEnv } from "@/shared/config/env";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  ACCESS_TOKEN_COOKIE_MAX_AGE,
  AUTH_COOKIE_OPTIONS,
  OAUTH_STATE_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
  USER_EMAIL_COOKIE_KEY,
  USER_EMAIL_COOKIE_MAX_AGE,
} from "@/shared/config/authToken";
import { USERS_ME_ENDPOINT } from "@/shared/config/endPoint";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const receivedState = req.nextUrl.searchParams.get("state");
  const storedState = req.cookies.get(OAUTH_STATE_COOKIE_KEY)?.value;

  if (!isOAuthStateValid(receivedState, storedState)) {
    return redirectToLogin(req, "invalid_state");
  }

  if (!code) {
    return redirectToLogin(req, "missing_code");
  }

  try {
    const result = await exchangeOAuthCodeOnServer(code);

    if (!result.success) {
      return redirectToLogin(req, "oauth_failed");
    }

    const { BACKEND_API_BASE_URL } = getServerEnv();

    if (!BACKEND_API_BASE_URL) {
      return redirectToLogin(req, "config_error");
    }

    const meResponse = await fetch(`${BACKEND_API_BASE_URL}${USERS_ME_ENDPOINT}`, {
      method: "GET",
      cache: "no-store",
      headers: { Authorization: `Bearer ${result.data.accessToken}` },
    });

    if (!meResponse.ok) {
      return redirectToLogin(req, "oauth_failed");
    }

    const meBody = (await meResponse.json()) as { data?: { email?: string; role?: string } };
    const role = meBody.data?.role;

    // TODO: 테스트 완료 후 ADMIN 으로 복구
    if (role !== "ADMIN" && role !== "USER") {
      return redirectToLogin(req, "forbidden");
    }

    const res = NextResponse.redirect(new URL("/dashboard", req.url));
    clearOAuthStateCookie(res);

    res.cookies.set(ACCESS_TOKEN_COOKIE_KEY, result.data.accessToken, {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
    });
    res.cookies.set(REFRESH_TOKEN_COOKIE_KEY, result.data.refreshToken, {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
    });
    res.cookies.set(USER_EMAIL_COOKIE_KEY, meBody.data?.email ?? "", {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: USER_EMAIL_COOKIE_MAX_AGE,
    });

    return res;
  } catch {
    return redirectToLogin(req, "oauth_exception");
  }
}

function redirectToLogin(request: NextRequest, errorCode: string) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("error", errorCode);
  const response = NextResponse.redirect(loginUrl);
  clearOAuthStateCookie(response);
  return response;
}

function clearOAuthStateCookie(response: NextResponse) {
  response.cookies.set(OAUTH_STATE_COOKIE_KEY, "", {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0,
  });
}
