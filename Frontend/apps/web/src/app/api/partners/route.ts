import { NextResponse } from "next/server";

import { getPartnersOnServer } from "@/entities/partner/server/getPartnersOnServer";
import { registerPartnerOnServer } from "@/entities/partner/server/registerPartnerOnServer";
import type { PartnerRequest } from "@/generated/api";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";

export async function GET() {
  const result = await getPartnersOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("PARTNERS_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}

export async function POST(request: Request) {
  const csrfResponse = rejectCrossOriginRequest(request);
  if (csrfResponse) return csrfResponse;

  let payload: PartnerRequest;

  try {
    payload = (await request.json()) as PartnerRequest;
  } catch {
    return NextResponse.json(
      createErrorResponse("INVALID_REQUEST_BODY", "Invalid request body."),
      { status: 400 },
    );
  }

  const result = await registerPartnerOnServer(payload);

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("PARTNER_REGISTER_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
