import { NextRequest, NextResponse } from "next/server";
import { exchangeOAuthCodeOnServer } from "@/entities/auth/server/exchangeOAuthCodeOnServer";

const ACCESS_TOKEN_COOKIE_KEY = "saju_access_token";
const REFRESH_TOKEN_COOKIE_KEY = "saju_refresh_token";
const DEFAULT_POST_LOGIN_PATH = "/saju/result";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", req.url));
  }
  try {
    const result = await exchangeOAuthCodeOnServer(code);

    if (!result.success) {
      return NextResponse.redirect(
        new URL("/login?error=oauth_failed", req.url),
      );
    }
    const res = NextResponse.redirect(
      new URL(DEFAULT_POST_LOGIN_PATH, req.url),
    );
    res.cookies.set(ACCESS_TOKEN_COOKIE_KEY, result.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
    res.cookies.set(REFRESH_TOKEN_COOKIE_KEY, result.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
    return res;
  } catch {
    return NextResponse.redirect(
      new URL("/login?error=oauth_exception", req.url),
    );
  }
}
