import type { Route } from "next";

const INTERNAL_REDIRECT_BASE_URL = "https://internal.saju.invalid";

export function normalizeInternalRedirectPath(
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

export function buildLoginPath(nextPath: string): Route {
  return `/login?next=${encodeURIComponent(nextPath)}` as Route;
}

type BuildSajuInputPathOptions = {
  forceInput?: boolean;
};

export function buildSajuInputPath(
  nextPath?: string | null,
  options?: BuildSajuInputPathOptions,
): Route {
  if (!nextPath) {
    return "/saju" as Route;
  }

  const searchParams = new URLSearchParams({
    next: nextPath,
  });

  if (options?.forceInput) {
    searchParams.set("forceInput", "1");
  }

  return `/saju?${searchParams.toString()}` as Route;
}

export function buildSajuResultPath(nextPath?: string | null): Route {
  if (!nextPath) {
    return "/saju/result" as Route;
  }

  return `/saju/result?next=${encodeURIComponent(nextPath)}` as Route;
}
