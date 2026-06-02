export const ACCESS_TOKEN_COOKIE_KEY = "saju_access_token";
export const REFRESH_TOKEN_COOKIE_KEY = "saju_refresh_token";
export const USER_EMAIL_COOKIE_KEY = "saju_user_email";
export const POST_LOGIN_REDIRECT_COOKIE_KEY = "saju_post_login_redirect";

export const ACCESS_TOKEN_COOKIE_MAX_AGE = 60 * 60;
export const REFRESH_TOKEN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const USER_EMAIL_COOKIE_MAX_AGE = REFRESH_TOKEN_COOKIE_MAX_AGE;
export const POST_LOGIN_REDIRECT_COOKIE_MAX_AGE = 60 * 10;

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
