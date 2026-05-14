import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { onSajuTraditionalFortuneGetOnServer } from "@/entities/saju/server/onSajuTraditionalFortuneGetOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";

export const revalidate = 0;

export async function GET() {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_KEY)?.value;

  if (!token) {
    return NextResponse.json(
      createErrorResponse("LOGIN_REQUIRED", "Login is required."),
      { status: 401 },
    );
  }

  const result = await onSajuTraditionalFortuneGetOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("SAJU_TRADITIONAL_FORTUNE_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
