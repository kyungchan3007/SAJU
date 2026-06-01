import { NextResponse } from "next/server";

import { getUnreadNotificationCountOnServer } from "@/entities/notification/server/getUnreadNotificationCountOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export const revalidate = 0;

export async function GET() {
  const result = await getUnreadNotificationCountOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("NOTIFICATIONS_UNREAD_COUNT_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data ?? 0));
}
