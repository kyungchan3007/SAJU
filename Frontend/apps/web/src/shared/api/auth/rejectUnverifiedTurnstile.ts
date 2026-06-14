import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createErrorResponse } from "@/shared/api";
import { TURNSTILE_VERIFIED_COOKIE_KEY } from "@/shared/config/turnstile";

export async function rejectUnverifiedTurnstile(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const verified = cookieStore.get(TURNSTILE_VERIFIED_COOKIE_KEY)?.value;

  if (!verified) {
    return NextResponse.json(
      createErrorResponse("TURNSTILE_REQUIRED", "보안 인증이 필요합니다."),
      { status: 403 },
    );
  }

  return null;
}
