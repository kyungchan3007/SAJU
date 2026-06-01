import { NextResponse } from "next/server";

import { getNotificationsOnServer } from "@/entities/notification/server/getNotificationsOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export const revalidate = 0;

export async function GET() {
  const result = await getNotificationsOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("NOTIFICATIONS_GET_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse(result.data));
}
