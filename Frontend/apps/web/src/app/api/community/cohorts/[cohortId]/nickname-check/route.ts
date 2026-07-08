import { NextResponse } from "next/server";

import { checkCommunityNicknameOnServer } from "@/entities/community/server/checkCommunityNicknameOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

type Params = {
  params: Promise<{
    cohortId: string;
  }>;
};

export async function GET(request: Request, { params }: Params) {
  const { cohortId: cohortIdParam } = await params;
  const cohortId = Number(cohortIdParam);
  const nickname = new URL(request.url).searchParams.get("nickname")?.trim();

  if (!Number.isFinite(cohortId) || cohortId < 1) {
    return NextResponse.json(createErrorResponse("INVALID_COHORT_ID"), {
      status: 400,
    });
  }

  if (!nickname) {
    return NextResponse.json(createErrorResponse("INVALID_NICKNAME"), {
      status: 400,
    });
  }

  const result = await checkCommunityNicknameOnServer(cohortId, nickname);

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("COMMUNITY_NICKNAME_CHECK_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
