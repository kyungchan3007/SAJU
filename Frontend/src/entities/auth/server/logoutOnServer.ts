import "server-only";

import { cookies } from "next/headers";

import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { REFRESH_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";
import { SAJU_AUTH_LOGOUT_PATH } from "@/shared/config/endPoint";

type LogoutOnServerSuccess = {
  success: true;
};

type LogoutOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type LogoutOnServerResult = LogoutOnServerSuccess | LogoutOnServerFailure;

export async function logoutOnServer(): Promise<LogoutOnServerResult> {
  const refreshToken = (await cookies()).get(REFRESH_TOKEN_COOKIE_KEY)?.value;

  if (!refreshToken) {
    return {
      success: false,
      status: 401,
      message: "Refresh token is missing.",
    };
  }

  const result = await authenticatedBackendFetch(SAJU_AUTH_LOGOUT_PATH, {
    method: "POST",
    headers: {
      "X-Refresh-Token": refreshToken,
    },
  });

  const parsed = await parseBackendApiResponse<void>(
    result.response,
    "Logout request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true };
}
