import { NextRequest, NextResponse } from "next/server";

import { createErrorResponse } from "@/shared/api";
import { getServerEnv } from "@/shared/config";
import { KAKAO_LOGIN_URL } from "@/shared/config/endPoint";

const ACCESS_TOKEN_COOKIE_KEY = "saju_access_token";
const REFRESH_TOKEN_COOKIE_KEY = "saju_refresh_token";

const DEFAULT_ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 15;
const DEFAULT_REFRESH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

function getHeaderValue(headers: Headers, keys: string[]) {
  for (const key of keys) {
    const value = headers.get(key)?.trim();
    if (value) return value;
  }
  return "";
}

function getBearerToken(rawValue: string) {
  return rawValue.replace(/^Bearer\s+/i, "").trim();
}

function getRedirectPath(nextPath: string | null) {
  return nextPath?.startsWith("/") ? nextPath : "/";
}

function getMaxAge(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function setAuthCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
  accessTokenMaxAge: number,
  refreshTokenMaxAge: number,
) {
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set({
    name: ACCESS_TOKEN_COOKIE_KEY,
    value: accessToken,
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: accessTokenMaxAge,
  });

  if (refreshToken) {
    response.cookies.set({
      name: REFRESH_TOKEN_COOKIE_KEY,
      value: refreshToken,
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: refreshTokenMaxAge,
    });
  }

  response.headers.set("x-authenticated", "true");
}

export async function GET(request: NextRequest) {
  const { BACKEND_API_BASE_URL } = getServerEnv();

  if (!BACKEND_API_BASE_URL) {
    return NextResponse.json(
      createErrorResponse(
        "CONFIG_ERROR",
        "BACKEND_API_BASE_URL is not configured.",
      ),
      { status: 500 },
    );
  }

  // 1) Next(BFF) -> Backend /api/auth/kakao GET 요청
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

  if (!backendResponse.ok) {
    return NextResponse.json(
      createErrorResponse(
        "KAKAO_AUTH_FAILED",
        `Backend auth request failed with status ${backendResponse.status}.`,
      ),
      { status: backendResponse.status },
    );
  }

  // 2) 백엔드 응답 헤더에서 서비스 토큰 추출
  const accessToken = getBearerToken(
    getHeaderValue(backendResponse.headers, [
      "x-access-token",
      "access-token",
      "authorization",
    ]),
  );
  const refreshToken = getBearerToken(
    getHeaderValue(backendResponse.headers, [
      "x-refresh-token",
      "refresh-token",
    ]),
  );

  if (!accessToken) {
    return NextResponse.json(
      createErrorResponse(
        "TOKEN_MISSING",
        "Backend response is missing access token headers.",
      ),
      { status: 502 },
    );
  }

  const accessTokenMaxAge = getMaxAge(
    backendResponse.headers.get("x-access-token-expires-in"),
    DEFAULT_ACCESS_TOKEN_MAX_AGE_SECONDS,
  );
  const refreshTokenMaxAge = getMaxAge(
    backendResponse.headers.get("x-refresh-token-expires-in"),
    DEFAULT_REFRESH_TOKEN_MAX_AGE_SECONDS,
  );

  // 3) 토큰을 HttpOnly 쿠키에 저장
  // 4) 로그인 후 이동 경로(next)로 리다이렉트
  const targetPath = getRedirectPath(request.nextUrl.searchParams.get("next"));
  const response = NextResponse.redirect(new URL(targetPath, request.url));
  setAuthCookies(
    response,
    accessToken,
    refreshToken,
    accessTokenMaxAge,
    refreshTokenMaxAge,
  );

  return response;
}
