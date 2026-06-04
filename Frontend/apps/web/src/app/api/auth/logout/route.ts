import { NextResponse } from "next/server";

import { logoutOnServer } from "@/entities/auth/server/logoutOnServer";
import { clearAuthCookies } from "@/shared/api/auth/clearAuthCookies";
import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export async function POST(request: Request) {
  const csrfResponse = rejectCrossOriginRequest(request);
  if (csrfResponse) return csrfResponse;

  const result = await logoutOnServer();

  if (!result.success) {
    const response = NextResponse.json(
      createErrorResponse("AUTH_LOGOUT_FAILED", result.message),
      { status: result.status },
    );
    clearAuthCookies(response);
    return response;
  }

  const response = NextResponse.json(
    createSuccessResponse({ loggedOut: true }),
  );
  clearAuthCookies(response);

  return response;
}
