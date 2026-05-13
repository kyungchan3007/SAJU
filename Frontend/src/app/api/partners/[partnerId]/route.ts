import { NextResponse } from "next/server";

import { deletePartnerOnServer } from "@/entities/partner/server/deletePartnerOnServer";
import { getPartnerOnServer } from "@/entities/partner/server/getPartnerOnServer";
import { updatePartnerOnServer } from "@/entities/partner/server/updatePartnerOnServer";
import type { PartnerRequest } from "@/generated/api";
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
    return NextResponse.json(
      createErrorResponse("INVALID_PARTNER_ID", "Partner id must be a number."),
      { status: 400 },
    );
  }

  const result = await getPartnerOnServer(partnerId);

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("PARTNER_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}

export async function PATCH(request: Request, context: RouteContext) {
  const { partnerId: rawPartnerId } = await context.params;
  const partnerId = parsePartnerId(rawPartnerId);

  if (!partnerId) {
    return NextResponse.json(
      createErrorResponse("INVALID_PARTNER_ID", "Partner id must be a number."),
      { status: 400 },
    );
  }

  let payload: PartnerRequest;

  try {
    payload = (await request.json()) as PartnerRequest;
  } catch {
    return NextResponse.json(
      createErrorResponse("INVALID_REQUEST_BODY", "Invalid request body."),
      { status: 400 },
    );
  }

  const result = await updatePartnerOnServer(partnerId, payload);

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("PARTNER_UPDATE_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}

export async function DELETE(_: Request, context: RouteContext) {
  const { partnerId: rawPartnerId } = await context.params;
  const partnerId = parsePartnerId(rawPartnerId);

  if (!partnerId) {
    return NextResponse.json(
      createErrorResponse("INVALID_PARTNER_ID", "Partner id must be a number."),
      { status: 400 },
    );
  }

  const result = await deletePartnerOnServer(partnerId);

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("PARTNER_DELETE_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse({ deleted: true }));
}
