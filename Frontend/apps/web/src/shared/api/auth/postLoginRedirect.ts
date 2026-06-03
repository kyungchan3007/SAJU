import type { Route } from "next";

const INTERNAL_REDIRECT_BASE_URL = "https://internal.saju.invalid";

export function normalizePostLoginRedirect(
  value: string | null | undefined,
): Route | null {
  if (!value) {
    return null;
  }

  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001F\u007F]/.test(value)
  ) {
    return null;
  }

  let redirectUrl: URL;

  try {
    redirectUrl = new URL(value, INTERNAL_REDIRECT_BASE_URL);
  } catch {
    return null;
  }

  if (redirectUrl.origin !== INTERNAL_REDIRECT_BASE_URL) {
    return null;
  }

  if (
    redirectUrl.pathname === "/api" ||
    redirectUrl.pathname.startsWith("/api/") ||
    redirectUrl.pathname === "/login" ||
    redirectUrl.pathname.startsWith("/login/")
  ) {
    return null;
  }

  return `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}` as Route;
}

export function buildLoginPath(nextPath: string): string {
  return `/login?next=${encodeURIComponent(nextPath)}`;
}
