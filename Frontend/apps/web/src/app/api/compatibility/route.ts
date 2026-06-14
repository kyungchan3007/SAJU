import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/shared/api";
import { withApiGuards } from "@/shared/api/auth/withApiGuards";

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

export const POST = withApiGuards(
  { requireCsrf: true, requireTurnstile: true },
  async () =>
    NextResponse.json(
      createSuccessResponse({
        feature: "compatibility",
        detailLocked: true,
        message:
          "Detailed compatibility unlock remains behind payment verification.",
      }),
    ),
);
