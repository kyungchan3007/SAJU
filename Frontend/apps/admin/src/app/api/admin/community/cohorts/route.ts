import { NextResponse } from "next/server";
import { getCommunityCohortsOnServer } from "@/entities/community/server/getCommunityCohortsOnServer";

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
