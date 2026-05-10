import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getSajuProfileOnServer } from "@/entities/saju/server/getSajuProfileOnServer";
import { updateSajuOnServer } from "@/entities/saju/server/updateSajuOnServer";
import type { SajuRequest } from "@/generated/api";
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

  const result = await getSajuProfileOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("SAJU_PROFILE_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}

export async function PUT(req: NextRequest) {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_KEY)?.value;

  if (!token) {
    return NextResponse.json(
      createErrorResponse("LOGIN_REQUIRED", "Login is required."),
      { status: 401 },
    );
  }

  let body: SajuRequest;
  try {
    body = (await req.json()) as SajuRequest;
  } catch {
    return NextResponse.json(
      createErrorResponse("INVALID_BODY", "Request body is invalid."),
      { status: 400 },
    );
  }

  const result = await updateSajuOnServer(body);

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("SAJU_UPDATE_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
