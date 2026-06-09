import { NextResponse } from "next/server";

import { joinCommunityOnServer } from "@/entities/community/server/joinCommunityOnServer";
import type { CommunityJoinRequest } from "@/generated/api";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";

export async function POST(request: Request) {
  const csrfResponse = rejectCrossOriginRequest(request);
  if (csrfResponse) return csrfResponse;

  let payload: CommunityJoinRequest;

  try {
    payload = (await request.json()) as CommunityJoinRequest;
  } catch {
    return NextResponse.json(
      createErrorResponse("INVALID_REQUEST_BODY", "Invalid request body."),
      { status: 400 },
    );
  }

  const result = await joinCommunityOnServer(payload);

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("COMMUNITY_JOIN_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data), { status: 201 });
}
