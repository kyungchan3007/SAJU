import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/shared/api";
import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json(
    createSuccessResponse({
      feature: "compatibility",
      previewAvailable: true,
      detailLocked: true,
      message: "Compatibility preview placeholder route is available.",
    }),
  );
}

export async function POST(request?: Request) {
  const csrfResponse = rejectCrossOriginRequest(request);
  if (csrfResponse) return csrfResponse;

  return NextResponse.json(
    createSuccessResponse({
      feature: "compatibility",
      detailLocked: true,
      message:
        "Detailed compatibility unlock remains behind payment verification.",
    }),
  );
}
