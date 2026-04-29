import { KAKAO_LOGIN_URL_TOKEN } from "@/shared/config/endPoint";
import { getServerEnv } from "@/shared/config";

type ExchangeData = {
  accessToken: string;
  refreshToken: string;
};

type ExchangeApiResponse =
  | { success: true; data: ExchangeData }
  | { success: false; message?: string };

type BackendTokenResponse = {
  code?: number;
  status?: number;
  message?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };
};

function isValidExchangeData(
  data: BackendTokenResponse["data"],
): data is ExchangeData {
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

  let body: BackendTokenResponse;

  try {
    body = (await resp.json()) as BackendTokenResponse;
  } catch {
    return { success: false, message: "Invalid backend response." };
  }

  if (!resp.ok) {
    return {
      success: false,
      message: body.message ?? `Backend request failed (${resp.status}).`,
    };
  }

  const isSuccessStatus = body.code === 200 || body.status === 200;
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
