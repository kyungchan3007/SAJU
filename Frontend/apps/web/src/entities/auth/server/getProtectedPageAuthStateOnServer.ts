import "server-only";

import type { Route } from "next";
import { cookies } from "next/headers";

import { buildLoginPath } from "@/shared/lib/internalRedirect";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";

type ProtectedPageAuthState =
  | { kind: "allow" }
  | { kind: "refresh"; loginPath: Route }
  | { kind: "redirect"; loginPath: Route };

export async function getProtectedPageAuthStateOnServer(
  targetPath: Route,
): Promise<ProtectedPageAuthState> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_KEY)?.value;
  const loginPath = buildLoginPath(targetPath);

  if (accessToken) {
    return { kind: "allow" };
  }

  if (refreshToken) {
    return { kind: "refresh", loginPath };
  }

  return { kind: "redirect", loginPath };
}
