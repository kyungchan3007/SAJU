import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { refreshAuthSessionOnServer } from "@/shared/api/auth/refreshAuthSessionOnServer";

export async function POST() {
  const cookieStore = await cookies();
  const refreshed = await refreshAuthSessionOnServer(cookieStore);

  if (!refreshed.success) {
    const code =
      refreshed.message === "REFRESH_TOKEN_MISSING"
        ? "REFRESH_TOKEN_MISSING"
        : "TOKEN_REFRESH_FAILED";
    const message =
      refreshed.message === "REFRESH_TOKEN_MISSING"
        ? "재로그인이 필요합니다."
        : "재로그인이 필요합니다.";
    return NextResponse.json(createErrorResponse(code, message), {
      status: refreshed.status,
    });
  }
  return NextResponse.json(createSuccessResponse({ refreshed: true }));
}
