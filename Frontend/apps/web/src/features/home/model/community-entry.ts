import type { Route } from "next";

export function resolveCommunityEntryHref(isLoggedIn: boolean): Route {
  return isLoggedIn ? "/community" : "/api/auth/kakao";
}
