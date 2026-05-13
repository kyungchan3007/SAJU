import { NextRequest, NextResponse } from "next/server";
import { exchangeOAuthCodeOnServer } from "@/entities/auth/server/exchangeOAuthCodeOnServer";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  console.log("code", code);
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

    const postLoginPath =
      result.data.accountStatus === "PENDING_DELETION"
        ? "/auth/restore"
        : result.data.isNewUser
          ? "/saju"
          : "/home";

    const res = NextResponse.redirect(new URL(postLoginPath, req.url));

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
