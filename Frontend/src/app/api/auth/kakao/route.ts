import { NextResponse } from "next/server";

import { createErrorResponse } from "@/shared/api";
import { getServerEnv } from "@/shared/config";
import { KAKAO_LOGIN_URL } from "@/shared/config/endPoint";
export async function GET() {
  const { BACKEND_API_BASE_URL } = getServerEnv();

  if (!BACKEND_API_BASE_URL) {
    return NextResponse.json(
      createErrorResponse(
        "CONFIG_ERROR",
        "BACKEND_API_BASE_URL is not configured.",
      ),
      { status: 500 },
    );
  }

  const backendUrl = new URL(KAKAO_LOGIN_URL, BACKEND_API_BASE_URL);

  let backendResponse: Response;
  try {
    backendResponse = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      redirect: "manual",
    });
  } catch {
    return NextResponse.json(
      createErrorResponse(
        "BACKEND_UNAVAILABLE",
        "Unable to reach backend auth endpoint.",
      ),
      { status: 502 },
    );
  }

  if (backendResponse.status >= 300 && backendResponse.status < 400) {
    const locationHeader = backendResponse.headers.get("location");
    console.log(backendResponse);
    if (!locationHeader) {
      return NextResponse.json(
        createErrorResponse(
          "KAKAO_AUTH_FAILED",
          "Backend auth redirect is missing Location header.",
        ),
        { status: 502 },
      );
    }

    const redirectUrl = new URL(locationHeader, BACKEND_API_BASE_URL);

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.json(
    createErrorResponse(
      "KAKAO_AUTH_FAILED",
      `Backend auth request failed with status ${backendResponse.status}.`,
    ),
    { status: backendResponse.status },
  );
}
