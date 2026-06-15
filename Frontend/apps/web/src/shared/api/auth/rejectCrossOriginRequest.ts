import { NextResponse } from "next/server";

import { createErrorResponse } from "@/shared/api/response";

export function rejectCrossOriginRequest(
  request?: Request,
): NextResponse | null {
  if (!request) {
    return null;
  }

  const origin = request.headers.get("origin");

  if (!origin) {
    return forbiddenResponse("CSRF_ORIGIN_REQUIRED");
  }

  let requestOrigin: string;

  try {
    requestOrigin = new URL(request.url).origin;
  } catch {
    return forbiddenResponse("CSRF_ORIGIN_MISMATCH");
  }

  return origin === requestOrigin
    ? null
    : forbiddenResponse("CSRF_ORIGIN_MISMATCH");
}

function forbiddenResponse(code: string) {
  return NextResponse.json(createErrorResponse(code), { status: 403 });
}
