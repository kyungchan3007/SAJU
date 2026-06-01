import { NextResponse } from "next/server";

import { markNotificationAsReadOnServer } from "@/entities/notification/server/markNotificationAsReadOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

type RouteContext = {
  params: Promise<{ notificationId: string }>;
};

function parseNotificationId(rawNotificationId: string) {
  const notificationId = Number(rawNotificationId);

  if (!Number.isInteger(notificationId) || notificationId <= 0) {
    return null;
  }

  return notificationId;
}

export async function POST(_: Request, context: RouteContext) {
  const { notificationId: rawNotificationId } = await context.params;
  const notificationId = parseNotificationId(rawNotificationId);

  if (!notificationId) {
    return NextResponse.json(
      createErrorResponse(
        "INVALID_NOTIFICATION_ID",
        "Notification id must be a number.",
      ),
      { status: 400 },
    );
  }

  const result = await markNotificationAsReadOnServer(notificationId);

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("NOTIFICATION_READ_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse({ read: true }));
}
