import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getMyPersonalityProfileOnServer } from "@/entities/saju/server/getMyPersonalityProfileOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";

export const revalidate = 0;

const PERSONALITY_CACHE_HEADER = {
  "Cache-Control": "private, max-age=300, stale-while-revalidate=600",
};

export async function GET() {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_KEY)?.value;

  if (!token) {
    return NextResponse.json(createErrorResponse("LOGIN_REQUIRED"), {
      status: 401,
    });
  }

  const result = await getMyPersonalityProfileOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("PERSONALITY_PROFILE_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data, result.meta), {
    headers: PERSONALITY_CACHE_HEADER,
  });
}
