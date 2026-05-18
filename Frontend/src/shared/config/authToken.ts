export const ACCESS_TOKEN_COOKIE_KEY = "saju_access_token";
export const REFRESH_TOKEN_COOKIE_KEY = "saju_refresh_token";
export const USER_EMAIL_COOKIE_KEY = "saju_user_email";

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
