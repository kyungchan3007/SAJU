import "server-only";

import { cookies } from "next/headers";
import { getServerEnv } from "@/shared/config/env";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  TOKEN_TYPE_COOKIE_KEY,
} from "@/shared/config/authToken";

const TOKEN_TYPE_FALLBACK = "Bearer";

type AuthenticatedBackendFetchResult =
  | { success: true; response: Response }
  | { success: false; response: Response };

export async function authenticatedBackendFetch(
  path: string,
  init: RequestInit = {},
): Promise<AuthenticatedBackendFetchResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  const tokenType =
    cookieStore.get(TOKEN_TYPE_COOKIE_KEY)?.value?.trim() ||
    TOKEN_TYPE_FALLBACK;

  if (!accessToken) {
    return {
      success: false,
      response: Response.json(
        { success: false, message: "LOGIN_REQUIRED" },
        { status: 401 },
      ),
    };
  }

  const { BACKEND_API_BASE_URL } = getServerEnv();

  if (!BACKEND_API_BASE_URL) {
    return {
      success: false,
      response: Response.json(
        { success: false, message: "BACKEND_API_BASE_URL is not configured." },
        { status: 500 },
      ),
    };
  }

  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  headers.set("Authorization", `${tokenType} ${accessToken}`);

  const response = await fetch(`${BACKEND_API_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers,
  });

  return { success: response.ok, response };
}
