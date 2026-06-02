import { NextResponse } from "next/server";

import { restoreMyAccountOnServer } from "@/entities/auth/server/restoreMyAccountOnServer";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export async function POST() {
  const result = await restoreMyAccountOnServer();

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("AUTH_RESTORE_FAILED", result.message),
      { status: result.status },
    );
  }

  return NextResponse.json(createSuccessResponse({ restored: true }));
}
