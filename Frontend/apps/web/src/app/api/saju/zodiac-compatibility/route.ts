import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getZodiacCompatibilityOnServer } from "@/entities/saju/server/getZodiacCompatibilityOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";

export const revalidate = 0;

export async function GET() {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_KEY)?.value;

  if (!token) {
    return NextResponse.json(
      createErrorResponse("LOGIN_REQUIRED", "로그인이 필요합니다."),
      { status: 401 },
    );
  }

  const result = await getZodiacCompatibilityOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("ZODIAC_COMPATIBILITY_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
