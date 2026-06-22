export const ACCESS_TOKEN_COOKIE_KEY = "saju_access_token";
export const TOKEN_TYPE_COOKIE_KEY = "saju_token_type";

export const ACCESS_TOKEN_FALLBACK_MAX_AGE = 60 * 60 * 8;

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
