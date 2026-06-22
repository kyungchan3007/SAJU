import "server-only";

import type { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  ACCESS_TOKEN_FALLBACK_MAX_AGE,
  AUTH_COOKIE_OPTIONS,
  TOKEN_TYPE_COOKIE_KEY,
} from "@/shared/config/authToken";

const TOKEN_TYPE_FALLBACK = "Bearer";

export type AdminAuthToken = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

export function normalizeTokenType(tokenType?: string | null) {
  return tokenType?.trim() || TOKEN_TYPE_FALLBACK;
}

export function normalizeTokenMaxAge(expiresIn?: number | null) {
  if (
    typeof expiresIn === "number" &&
    Number.isFinite(expiresIn) &&
    expiresIn > 0
  ) {
    return Math.floor(expiresIn);
  }

  return ACCESS_TOKEN_FALLBACK_MAX_AGE;
}

export function setAdminAuthCookies(
  response: NextResponse,
  token: AdminAuthToken,
) {
  const maxAge = normalizeTokenMaxAge(token.expiresIn);

  response.cookies.set(ACCESS_TOKEN_COOKIE_KEY, token.accessToken, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge,
  });
  response.cookies.set(
    TOKEN_TYPE_COOKIE_KEY,
    normalizeTokenType(token.tokenType),
    {
      ...AUTH_COOKIE_OPTIONS,
      maxAge,
    },
  );
}
