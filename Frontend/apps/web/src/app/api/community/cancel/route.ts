import { NextResponse } from "next/server";

import { cancelCommunityMembershipOnServer } from "@/entities/community/server/cancelCommunityMembershipOnServer";
import type { CancelMembershipRequest } from "@/generated/api";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { withApiGuards } from "@/shared/api/auth/withApiGuards";

export const POST = withApiGuards(
  { requireCsrf: true, requireTurnstile: true },
  async (request: Request) => {
    let payload: CancelMembershipRequest;

    try {
      payload = (await request.json()) as CancelMembershipRequest;
    } catch {
      return NextResponse.json(createErrorResponse("INVALID_REQUEST_BODY"), {
        status: 400,
      });
    }

    if (
      typeof payload.memberId !== "number" ||
      !Number.isFinite(payload.memberId)
    ) {
      return NextResponse.json(createErrorResponse("INVALID_REQUEST_BODY"), {
        status: 400,
      });
    }

    const result = await cancelCommunityMembershipOnServer(payload);

    if (!result.success) {
      return NextResponse.json(
        createErrorResponse("COMMUNITY_CANCEL_FAILED", result.message),
        { status: result.status },
      );
    }

    return NextResponse.json(createSuccessResponse(result.data));
  },
);
