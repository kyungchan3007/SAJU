import "server-only";

import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { refreshTokenOnServer } from "@/entities/auth/server/refreshTokenOnServer";
import {
  ACCESS_TOKEN_COOKIE_MAX_AGE,
  ACCESS_TOKEN_COOKIE_KEY,
  AUTH_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
  REFRESH_TOKEN_COOKIE_KEY,
  USER_EMAIL_COOKIE_KEY,
} from "@/shared/config/authToken";

type CookieStore = Pick<ReadonlyRequestCookies, "get" | "set" | "delete">;

type RefreshAuthSessionSuccess = {
  success: true;
  accessToken: string;
  refreshToken: string;
};

type RefreshAuthSessionFailure = {
  success: false;
  status: number;
  message: string;
};

export type RefreshAuthSessionResult =
  | RefreshAuthSessionSuccess
  | RefreshAuthSessionFailure;

const refreshRequests = new Map<
  string,
  ReturnType<typeof refreshTokenOnServer>
>();

export async function refreshAuthSessionOnServer(
  cookieStore: CookieStore,
): Promise<RefreshAuthSessionResult> {
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_KEY)?.value;

  if (!refreshToken) {
    return {
      success: false,
      status: 401,
      message: "REFRESH_TOKEN_MISSING",
    };
  }

  let refreshRequest = refreshRequests.get(refreshToken);

  if (!refreshRequest) {
    refreshRequest = refreshTokenOnServer(refreshToken);
    refreshRequests.set(refreshToken, refreshRequest);
  }

  let refreshed: Awaited<ReturnType<typeof refreshTokenOnServer>>;

  try {
    refreshed = await refreshRequest;
  } finally {
    if (refreshRequests.get(refreshToken) === refreshRequest) {
      refreshRequests.delete(refreshToken);
    }
  }

  if (!refreshed.success) {
    cookieStore.delete(ACCESS_TOKEN_COOKIE_KEY);
    cookieStore.delete(REFRESH_TOKEN_COOKIE_KEY);
    cookieStore.delete(USER_EMAIL_COOKIE_KEY);

    return {
      success: false,
      status: refreshed.status,
      message: refreshed.message,
    };
  }

  cookieStore.set(ACCESS_TOKEN_COOKIE_KEY, refreshed.data.accessToken, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
  });

  cookieStore.set(REFRESH_TOKEN_COOKIE_KEY, refreshed.data.refreshToken, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
  });

  return {
    success: true,
    accessToken: refreshed.data.accessToken,
    refreshToken: refreshed.data.refreshToken,
  };
}
