import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/shared/api";

export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json(
    createSuccessResponse(
      {
        feature: "payment",
        verified: false,
        unlockEligible: false,
        message:
          "Sensitive payment verification will be implemented in this BFF route.",
      },
      {
        sensitivity: "high",
      },
    ),
  );
}
