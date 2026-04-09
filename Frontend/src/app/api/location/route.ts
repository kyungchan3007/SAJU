import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/shared/api";

export const revalidate = 300;

export async function GET() {
  return NextResponse.json(
    createSuccessResponse({
      feature: "location",
      mapProvider: "kakao",
      message: "Location recommendation placeholder route is available.",
    }),
  );
}

export async function POST() {
  return NextResponse.json(
    createSuccessResponse({
      feature: "location",
      status: "placeholder",
      message:
        "Saju-based place recommendation composition will be handled here.",
    }),
  );
}
