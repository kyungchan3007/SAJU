import { NextRequest, NextResponse } from "next/server";
import { exchangeOAuthCodeOnServer } from "@/entities/auth/server/exchangeOAuthCodeOnServer";
import { isOAuthStateValid } from "@/shared/api/auth/oauthState";
import { normalizePostLoginRedirect } from "@/shared/api/auth/postLoginRedirect";
import { getServerEnv } from "@/shared/config";
import {
  ACCESS_TOKEN_COOKIE_MAX_AGE,
  ACCESS_TOKEN_COOKIE_KEY,
  AUTH_COOKIE_OPTIONS,
  OAUTH_STATE_COOKIE_KEY,
  POST_LOGIN_REDIRECT_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
  REFRESH_TOKEN_COOKIE_KEY,
  USER_EMAIL_COOKIE_MAX_AGE,
  USER_EMAIL_COOKIE_KEY,
} from "@/shared/config/authToken";
import { SAJU_USERS_ME_PATH } from "@/shared/config/endPoint";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const receivedState = req.nextUrl.searchParams.get("state");
  const storedState = req.cookies.get(OAUTH_STATE_COOKIE_KEY)?.value;
  const requestedNextPath = normalizePostLoginRedirect(
    req.cookies.get(POST_LOGIN_REDIRECT_COOKIE_KEY)?.value,
  );

  if (!isOAuthStateValid(receivedState, storedState)) {
    return redirectToLogin(req, "invalid_state", requestedNextPath);
  }

  if (!code) {
    return redirectToLogin(req, "missing_code", requestedNextPath);
  }
  try {
    const result = await exchangeOAuthCodeOnServer(code);

    if (!result.success) {
      return redirectToLogin(req, "oauth_failed", requestedNextPath);
    }

    const postLoginPath =
      result.data.accountStatus === "PENDING_DELETION"
        ? "/auth/restore"
        : requestedNextPath
          ? requestedNextPath
        : result.data.isNewUser
          ? "/saju"
          : "/home";

    const res = NextResponse.redirect(new URL(postLoginPath, req.url));
    clearOAuthStateCookie(res);
    clearPostLoginRedirectCookie(res);

    res.cookies.set(ACCESS_TOKEN_COOKIE_KEY, result.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
    });
    res.cookies.set(REFRESH_TOKEN_COOKIE_KEY, result.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
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
          maxAge: USER_EMAIL_COOKIE_MAX_AGE,
        });
      } catch {
        res.cookies.set(USER_EMAIL_COOKIE_KEY, "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: USER_EMAIL_COOKIE_MAX_AGE,
        });
      }
    }

    return res;
  } catch {
    return redirectToLogin(req, "oauth_exception", requestedNextPath);
  }
}

function redirectToLogin(
  request: NextRequest,
  errorCode: string,
  requestedNextPath: string | null,
) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("error", errorCode);

  if (requestedNextPath) {
    loginUrl.searchParams.set("next", requestedNextPath);
  }

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

function clearPostLoginRedirectCookie(response: NextResponse) {
  response.cookies.set(POST_LOGIN_REDIRECT_COOKIE_KEY, "", {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0,
  });
}
