import "server-only";

import { cookies } from "next/headers";
import { getServerEnv } from "@/shared/config/env";
import {
  ACCESS_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";

type AuthenticatedBackendFetchResult =
  | { success: true; response: Response }
  | { success: false; response: Response };

export async function authenticatedBackendFetch(
  path: string,
  init: RequestInit = {},
): Promise<AuthenticatedBackendFetchResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;

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

  const response = await fetch(`${BACKEND_API_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      ...init.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { success: response.ok, response };
}
