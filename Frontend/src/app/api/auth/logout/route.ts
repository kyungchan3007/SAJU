import { NextResponse } from "next/server";

import { logoutOnServer } from "@/entities/auth/server/logoutOnServer";
import { clearAuthCookies } from "@/shared/api/auth/clearAuthCookies";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export async function POST() {
  const result = await logoutOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("AUTH_LOGOUT_FAILED", result.message),
      { status: result.status },
    );
  }

  const response = NextResponse.json(
    createSuccessResponse({ loggedOut: true }),
  );
  clearAuthCookies(response);

  return response;
}
