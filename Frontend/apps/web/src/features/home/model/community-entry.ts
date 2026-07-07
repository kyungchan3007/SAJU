import type { Route } from "next";
import { KAKAO_LOGIN_URL } from "@/shared/config/endPoint";

export function resolveCommunityEntryHref(isLoggedIn: boolean): Route {
  return isLoggedIn ? "/community" : (KAKAO_LOGIN_URL as Route);
}
