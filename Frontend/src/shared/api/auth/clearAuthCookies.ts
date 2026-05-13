import type { NextResponse } from "next/server";

import {
  ACCESS_TOKEN_COOKIE_KEY,
  AUTH_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(ACCESS_TOKEN_COOKIE_KEY, "", {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE_KEY, "", {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0,
  });
}
