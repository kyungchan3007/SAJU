import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getMyYearFortuneOnServer } from "@/entities/saju/server/getMyYearFortuneOnServer";
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

  const result = await getMyYearFortuneOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("YEAR_FORTUNE_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data, result.meta));
}
