import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/shared/api";
import { clearAuthCookies } from "@/shared/api/auth/clearAuthCookies";
import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";

export async function POST(request?: Request) {
  const csrfResponse = rejectCrossOriginRequest(request);
  if (csrfResponse) return csrfResponse;

  const response = NextResponse.json(
    createSuccessResponse({ declined: true, clearedAuth: true }),
  );

  clearAuthCookies(response);

  return response;
}
