import { NextRequest, NextResponse } from "next/server";
import { exchangeOAuthCodeOnServer } from "@/entities/auth/server/exchangeOAuthCodeOnServer";
import { getServerEnv } from "@/shared/config";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
  USER_EMAIL_COOKIE_KEY,
} from "@/shared/config/authToken";
import { SAJU_USERS_ME_PATH } from "@/shared/config/endPoint";

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

    const { BACKEND_API_BASE_URL } = getServerEnv();
    if (BACKEND_API_BASE_URL) {
      try {
        const meResponse = await fetch(
          `${BACKEND_API_BASE_URL}${SAJU_USERS_ME_PATH}`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${result.data.accessToken}`,
            },
          },
        );

        const meBody = (await meResponse.json()) as {
          data?: { email?: string };
        };
        const email = meBody.data?.email ?? "";

        res.cookies.set(USER_EMAIL_COOKIE_KEY, email, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60,
        });
      } catch {
        res.cookies.set(USER_EMAIL_COOKIE_KEY, "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60,
        });
      }
    }

    return res;
  } catch {
    return NextResponse.redirect(
      new URL("/login?error=oauth_exception", req.url),
    );
  }
}
