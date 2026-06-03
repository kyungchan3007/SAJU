import { NextResponse } from "next/server";

import { createSuccessResponse } from "@/shared/api";
import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";

export const dynamic = "force-dynamic";

export async function POST(request?: Request) {
  const csrfResponse = rejectCrossOriginRequest(request);
  if (csrfResponse) return csrfResponse;

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
