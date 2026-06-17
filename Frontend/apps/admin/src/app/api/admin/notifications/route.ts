import { NextRequest, NextResponse } from "next/server";
import { createNotificationOnServer } from "@/entities/notification/server/createNotificationOnServer";
import type { NotificationCreateRequest } from "@/features/notification/type/types";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as NotificationCreateRequest;
  const result = await createNotificationOnServer(body);

  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: result.status },
    );
  }

  return new NextResponse(null, { status: 204 });
}
