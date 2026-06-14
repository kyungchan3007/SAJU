import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { onSajuTraditionalGetOnServer } from "@/entities/saju/server/onSajuTraditionalGetOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { withApiGuards } from "@/shared/api/auth/withApiGuards";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";

export const revalidate = 0;

export const GET = withApiGuards({ requireTurnstile: true }, async () => {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_KEY)?.value;

  if (!token) {
    return NextResponse.json(
      createErrorResponse("LOGIN_REQUIRED", "로그인이 필요합니다."),
      { status: 401 },
    );
  }

  const result = await onSajuTraditionalGetOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("SAJU_TRADITIONAL_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
});
