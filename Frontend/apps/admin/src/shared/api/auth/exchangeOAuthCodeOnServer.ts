import "server-only";

import { getServerEnv } from "@/shared/config/env";

const KAKAO_TOKEN_ENDPOINT = "/api/auth/kakao/token";

type TokenResult = {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
  accountStatus: string;
};

type ExchangeResult =
  | { success: true; data: TokenResult }
  | { success: false; message?: string };

export async function exchangeOAuthCodeOnServer(code: string): Promise<ExchangeResult> {
  const { BACKEND_API_BASE_URL } = getServerEnv();

  const resp = await fetch(`${BACKEND_API_BASE_URL}${KAKAO_TOKEN_ENDPOINT}`, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  let body: { status?: number; data?: TokenResult; message?: string };

  try {
    body = await resp.json() as typeof body;
  } catch {
    return { success: false, message: "Invalid backend response." };
  }

  if (!resp.ok || !body.data?.accessToken || !body.data?.refreshToken) {
    return {
      success: false,
      message: body.message ?? `Token exchange failed (${resp.status}).`,
    };
  }

  return { success: true, data: body.data };
}
