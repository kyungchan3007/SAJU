import { KAKAO_LOGIN_URL_TOKEN } from "@/shared/config/endPoint";
import { getServerEnv } from "@/shared/config";
import type { ApiResponseTokenResult, TokenResult } from "@/generated/api";

type ValidTokenResult = TokenResult & {
  accessToken: string;
  refreshToken: string;
};

type ExchangeApiResponse =
  | { success: true; data: ValidTokenResult }
  | { success: false; message?: string };

function isValidExchangeData(
  data: ApiResponseTokenResult["data"],
): data is ValidTokenResult {
  return !!(data?.accessToken && data?.refreshToken);
}

export async function exchangeOAuthCodeOnServer(
  code: string,
): Promise<ExchangeApiResponse> {
  const { BACKEND_API_BASE_URL } = getServerEnv();

  const url = `${BACKEND_API_BASE_URL}${KAKAO_LOGIN_URL_TOKEN}`;

  const resp = await fetch(url, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  let body: ApiResponseTokenResult;

  try {
    body = (await resp.json()) as ApiResponseTokenResult;
  } catch {
    return { success: false, message: "Invalid backend response." };
  }

  if (!resp.ok) {
    return {
      success: false,
      message: body.message ?? `Backend request failed (${resp.status}).`,
    };
  }

  const isSuccessStatus = body.status === 200;
  if (!isSuccessStatus || !isValidExchangeData(body.data)) {
    return {
      success: false,
      message: body.message ?? "Token exchange response is invalid.",
    };
  }

  return {
    success: true,
    data: body.data,
  };
}
