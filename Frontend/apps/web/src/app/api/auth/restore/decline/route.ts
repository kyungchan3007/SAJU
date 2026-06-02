import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/shared/api";
import { clearAuthCookies } from "@/shared/api/auth/clearAuthCookies";

export async function POST() {
  const response = NextResponse.json(
    createSuccessResponse({ declined: true, clearedAuth: true }),
  );

  clearAuthCookies(response);

  return response;
}
