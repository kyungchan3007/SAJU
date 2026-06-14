import { NextResponse } from "next/server";

import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";
import { verifyTurnstile } from "@/shared/api/verifyTurnstile";
import { AUTH_COOKIE_OPTIONS } from "@/shared/config/authToken";
import {
  TURNSTILE_VERIFIED_COOKIE_KEY,
  TURNSTILE_VERIFIED_COOKIE_MAX_AGE,
} from "@/shared/config/turnstile";

export async function POST(request: Request) {
  const csrfResponse = rejectCrossOriginRequest(request);
  if (csrfResponse) return csrfResponse;

  let token: string | undefined;
  try {
    const body = (await request.json()) as { token?: string };
    token = body.token;
  } catch {
    return NextResponse.json(
      createErrorResponse("INVALID_BODY", "요청 본문을 확인해주세요."),
      { status: 400 },
    );
  }

  if (!token) {
    return NextResponse.json(
      createErrorResponse(
        "MISSING_TOKEN",
        "보안 인증 토큰이 없어 다시 인증이 필요합니다.",
      ),
      { status: 400 },
    );
  }

  const success = await verifyTurnstile(token);
  if (!success) {
    return NextResponse.json(
      createErrorResponse(
        "VERIFICATION_FAILED",
        "보안 인증에 실패해 다시 시도해주세요.",
      ),
      { status: 403 },
    );
  }

  const response = NextResponse.json(createSuccessResponse({ verified: true }));
  response.cookies.set(TURNSTILE_VERIFIED_COOKIE_KEY, "1", {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: TURNSTILE_VERIFIED_COOKIE_MAX_AGE,
  });

  return response;
}
