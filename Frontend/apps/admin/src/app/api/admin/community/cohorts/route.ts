import { NextRequest, NextResponse } from "next/server";
import { getCommunityCohortsOnServer } from "@/entities/community/server/getCommunityCohortsOnServer";
import { createCommunityCohortOnServer } from "@/entities/community/server/createCommunityCohortOnServer";
import type { CommunityCohortCreateRequest } from "@/features/community-cohort/type/types";

export const revalidate = 0;

export async function GET() {
  const result = await getCommunityCohortsOnServer();

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json({ success: true, data: result.data });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as CommunityCohortCreateRequest;
  const result = await createCommunityCohortOnServer(body);

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json({ success: true, data: result.data }, { status: 201 });
}
