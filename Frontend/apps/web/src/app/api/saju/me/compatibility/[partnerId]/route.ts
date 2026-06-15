import { NextResponse } from "next/server";

import { getCompatibilityOnServer } from "@/entities/compatibility/server/getCompatibilityOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

function parsePartnerId(rawPartnerId: string) {
  const partnerId = Number(rawPartnerId);

  if (!Number.isInteger(partnerId) || partnerId <= 0) {
    return null;
  }

  return partnerId;
}

type RouteContext = {
  params: Promise<{ partnerId: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { partnerId: rawPartnerId } = await context.params;
  const partnerId = parsePartnerId(rawPartnerId);

  if (!partnerId) {
    return NextResponse.json(createErrorResponse("INVALID_PARTNER_ID"), {
      status: 400,
    });
  }

  const result = await getCompatibilityOnServer(partnerId);

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("COMPATIBILITY_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data, result.meta));
}
