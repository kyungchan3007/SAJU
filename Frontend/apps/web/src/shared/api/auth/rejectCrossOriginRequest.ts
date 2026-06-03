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
    return null;
  }

  let requestOrigin: string;

  try {
    requestOrigin = new URL(request.url).origin;
  } catch {
    return forbiddenResponse();
  }

  return origin === requestOrigin ? null : forbiddenResponse();
}

function forbiddenResponse() {
  return NextResponse.json(
    createErrorResponse("CSRF_ORIGIN_MISMATCH", "Cross-origin request denied."),
    { status: 403 },
  );
}
