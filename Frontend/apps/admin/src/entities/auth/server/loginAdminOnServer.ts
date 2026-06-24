import "server-only";

import { ADMIN_LOGIN_ENDPOINT_PATH } from "@/shared/config/endPoint";
import { getServerEnv } from "@/shared/config/env";
import {
  type AdminAuthToken,
  normalizeTokenMaxAge,
  normalizeTokenType,
} from "@/entities/auth/server/adminAuthCookies";

export type AdminLoginRequest = {
  username: string;
  password: string;
};

type AdminLoginResponseBody = {
  status?: number;
  errorCode?: string | null;
  message?: string;
  data?: {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
  };
};

type AdminLoginResult =
  | { success: true; data: AdminAuthToken }
  | { success: false; status: number; message: string };

export async function loginAdminOnServer(
  credentials: AdminLoginRequest,
): Promise<AdminLoginResult> {
  const { BACKEND_API_BASE_URL } = getServerEnv();

  if (!BACKEND_API_BASE_URL) {
    return {
      success: false,
      status: 500,
      message: "BACKEND_API_BASE_URL is not configured.",
    };
  }

  let response: Response;

  try {
    response = await fetch(
      `${BACKEND_API_BASE_URL}${ADMIN_LOGIN_ENDPOINT_PATH}`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );
  } catch {
    return {
      success: false,
      status: 502,
      message: "BACKEND_UNAVAILABLE",
    };
  }

  const rawText = await response.text().catch(() => "");

  let body: AdminLoginResponseBody | null = null;
  try {
    body = JSON.parse(rawText) as AdminLoginResponseBody;
  } catch {
    body = null;
  }

  if (!response.ok) {
    console.error("[login] backend status:", response.status, "raw:", rawText);
    return {
      success: false,
      status: response.status,
      message: body?.message ?? "ADMIN_LOGIN_FAILED",
    };
  }

  const tokenData = body?.data;
  const accessToken = tokenData?.accessToken;

  if (!accessToken) {
    return {
      success: false,
      status: 502,
      message: "Invalid admin login response.",
    };
  }

  return {
    success: true,
    data: {
      accessToken,
      tokenType: normalizeTokenType(tokenData.tokenType),
      expiresIn: normalizeTokenMaxAge(tokenData.expiresIn),
    },
  };
}
