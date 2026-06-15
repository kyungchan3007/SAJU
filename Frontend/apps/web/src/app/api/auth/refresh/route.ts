import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";
import { refreshAuthSessionOnServer } from "@/shared/api/auth/refreshAuthSessionOnServer";

export async function POST(request: Request) {
  const csrfResponse = rejectCrossOriginRequest(request);
  if (csrfResponse) return csrfResponse;

  const cookieStore = await cookies();
  const refreshed = await refreshAuthSessionOnServer(cookieStore);

  if (!refreshed.success) {
    const code =
      refreshed.message === "REFRESH_TOKEN_MISSING"
        ? "REFRESH_TOKEN_MISSING"
        : "TOKEN_REFRESH_FAILED";

    return NextResponse.json(createErrorResponse(code), {
      status: refreshed.status,
    });
  }

  return NextResponse.json(createSuccessResponse({ refreshed: true }));
}
