import "server-only";

import { getServerEnv } from "@/shared/config";
import { SAJU_AUTH_REFRESH_PATH } from "@/shared/config/endPoint";
import type { ApiResponseTokenResult, TokenResult } from "@/generated/api";

type ValidTokenResult = TokenResult & {
  accessToken: string;
  refreshToken: string;
};

type RefreshTokenResult =
  | { success: true; data: ValidTokenResult }
  | { success: false; status: number; message: string };

function isValidTokenResult(
  data: ApiResponseTokenResult["data"],
): data is ValidTokenResult {
  return !!(data?.accessToken && data?.refreshToken);
}

export async function refreshTokenOnServer(
  refreshToken: string,
): Promise<RefreshTokenResult> {
  const { BACKEND_API_BASE_URL } = getServerEnv();

  if (!BACKEND_API_BASE_URL) {
    return {
      success: false,
      status: 500,
      message: "BACKEND_API_BASE_URL is not configured.",
    };
  }

  const response = await fetch(
    `${BACKEND_API_BASE_URL}${SAJU_AUTH_REFRESH_PATH}`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "X-Refresh-Token": refreshToken,
      },
    },
  );

  let body: ApiResponseTokenResult | null = null;

  try {
    body = (await response.json()) as ApiResponseTokenResult;
  } catch {
    body = null;
  }

  if (!response.ok || !isValidTokenResult(body?.data)) {
    return {
      success: false,
      status: response.status,
      message: body?.message ?? `Token refresh failed (${response.status}).`,
    };
  }

  return {
    success: true,
    data: body.data,
  };
}
