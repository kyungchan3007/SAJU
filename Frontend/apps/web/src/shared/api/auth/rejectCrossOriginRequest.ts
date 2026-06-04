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
    return forbiddenResponse(
      "CSRF_ORIGIN_REQUIRED",
      "Origin header is required for state-changing requests.",
    );
  }

  let requestOrigin: string;

  try {
    requestOrigin = new URL(request.url).origin;
  } catch {
    return forbiddenResponse(
      "CSRF_ORIGIN_MISMATCH",
      "Cross-origin request denied.",
    );
  }

  return origin === requestOrigin
    ? null
    : forbiddenResponse(
        "CSRF_ORIGIN_MISMATCH",
        "Cross-origin request denied.",
      );
}

function forbiddenResponse(code: string, message: string) {
  return NextResponse.json(
    createErrorResponse(code, message),
    { status: 403 },
  );
}
