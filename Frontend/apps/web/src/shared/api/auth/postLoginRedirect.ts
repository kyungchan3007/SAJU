import type { Route } from "next";

export function normalizePostLoginRedirect(
  value: string | null | undefined,
): Route | null {
  if (!value) {
    return null;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return null;
  }

  if (value.startsWith("/api/") || value.startsWith("/login")) {
    return null;
  }

  return value as Route;
}

export function buildLoginPath(nextPath: string): string {
  return `/login?next=${encodeURIComponent(nextPath)}`;
}
