import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/shared/api";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json(
    createSuccessResponse({
      feature: "saju",
      status: "ready",
      message: "Saju BFF placeholder route is available.",
    }),
  );
}

export async function POST() {
  return NextResponse.json(
    createSuccessResponse({
      feature: "saju",
      status: "placeholder",
      message:
        "Future backend normalization for saju input will be handled here.",
    }),
  );
}
