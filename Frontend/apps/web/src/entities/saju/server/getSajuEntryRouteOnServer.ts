import "server-only";

import { cookies } from "next/headers";

import { getSajuProfileOnServer } from "@/entities/saju/server/getSajuProfileOnServer";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "@/shared/config/authToken";
import { SAJU_PENDING_FORM_COOKIE_KEY } from "@/shared/config/sajuCookie";

export type SajuEntryRoute = "input" | "result";

export async function getSajuEntryRouteOnServer(): Promise<SajuEntryRoute> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_KEY)?.value;
  const pendingForm = cookieStore.get(SAJU_PENDING_FORM_COOKIE_KEY)?.value;

  if (!accessToken) {
    if (refreshToken) {
      return "result";
    }

    return "input";
  }

  if (pendingForm) {
    return "result";
  }

  const profile = await getSajuProfileOnServer({ refreshOnUnauthorized: false });

  if (!profile.success) {
    return "result";
  }

  return profile.data?.sajuAnalysis ? "result" : "input";
}
