import "server-only";
import { cookies } from "next/headers";
import { refreshTokenOnServer } from "@/entities/auth/server/refreshTokenOnServer";
import { getServerEnv } from "@/shared/config";

import {
  ACCESS_TOKEN_COOKIE_KEY,
  AUTH_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";

type AuthenticatedBackendFetchResult =
  | { success: true; response: Response; accessToken: string }
  | { success: false; response: Response };

export async function authenticatedBackendFetch(
  path: string,
  init: RequestInit = {},
): Promise<AuthenticatedBackendFetchResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_KEY)?.value;

  if (!accessToken) {
    return {
      success: false,
      response: Response.json(
        { success: false, message: "LOGIN_REQUIRED" },
        { status: 401 },
      ),
    };
  }

  const firstResponse = await requestBackend(path, init, accessToken);

  if (firstResponse.status !== 401) {
    return {
      success: true,
      response: firstResponse,
      accessToken,
    };
  }

  if (!refreshToken) {
    return {
      success: false,
      response: firstResponse,
    };
  }

  const refreshed = await refreshTokenOnServer(refreshToken);

  if (!refreshed.success) {
    cookieStore.delete(ACCESS_TOKEN_COOKIE_KEY);
    cookieStore.delete(REFRESH_TOKEN_COOKIE_KEY);

    return {
      success: false,
      response: Response.json(
        { success: false, message: "TOKEN_REFRESH_FAILED" },
        { status: 401 },
      ),
    };
  }

  cookieStore.set(ACCESS_TOKEN_COOKIE_KEY, refreshed.data.accessToken, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 60 * 60,
  });

  cookieStore.set(REFRESH_TOKEN_COOKIE_KEY, refreshed.data.refreshToken, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 60 * 60,
  });

  const retryResponse = await requestBackend(
    path,
    init,
    refreshed.data.accessToken,
  );

  return {
    success: retryResponse.ok,
    response: retryResponse,
    accessToken: refreshed.data.accessToken,
  };
}

async function requestBackend(
  path: string,
  init: RequestInit,
  accessToken: string,
) {
  const { BACKEND_API_BASE_URL } = getServerEnv();

  if (!BACKEND_API_BASE_URL) {
    return Response.json(
      { success: false, message: "BACKEND_API_BASE_URL is not configured." },
      { status: 500 },
    );
  }

  return fetch(`${BACKEND_API_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      ...init.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
