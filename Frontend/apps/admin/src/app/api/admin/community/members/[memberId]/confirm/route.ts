import { NextResponse } from "next/server";
import { confirmMemberOnServer } from "@/entities/payment/server/confirmMemberOnServer";

type RouteContext = {
  params: Promise<{ memberId: string }>;
};

export async function POST(_req: Request, { params }: RouteContext) {
  const { memberId: memberIdParam } = await params;
  const memberId = Number(memberIdParam);

  if (!Number.isFinite(memberId) || memberId < 1) {
    return NextResponse.json(
      { success: false, message: "INVALID_MEMBER_ID" },
      { status: 400 },
    );
  }

  const result = await confirmMemberOnServer(memberId);

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json({ success: true });
}

