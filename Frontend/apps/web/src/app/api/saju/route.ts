import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createSuccessResponse } from "@/shared/api";
import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json(
    createSuccessResponse({
      feature: "saju",
      status: "ready",
      message: "Saju BFF placeholder route is available.",
    }),
  );
}

export async function POST(request?: Request) {
  const csrfResponse = rejectCrossOriginRequest(request);
  if (csrfResponse) return csrfResponse;

  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_KEY)?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "LOGIN_REQUIRED" },
      { status: 401 },
    );
  }

  return NextResponse.json(
    createSuccessResponse({
      feature: "saju",
      status: "placeholder",
      previewReady: true,
      message: "Authenticated request accepted for saju preview flow.",
    }),
  );
}
