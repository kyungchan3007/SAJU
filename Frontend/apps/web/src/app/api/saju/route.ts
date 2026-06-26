import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { onSajuPostOnServer } from "@/entities/saju/server/onSajuPostOnServer";
import {
  readPendingSajuFormValue,
  readSubmittedSajuFormValue,
} from "@/entities/saju/server/sajuFormPayload";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";
import { SAJU_PENDING_FORM_COOKIE_KEY } from "@/shared/config/sajuCookie";

export const revalidate = 60;

export async function GET() {
  return NextResponse.json(
    createSuccessResponse({
      feature: "saju",
      status: "ready",
      message: "Saju BFF placeholder route is available.",
    }),
  );
}

export async function POST(request?: Request) {
  const csrfResponse = rejectCrossOriginRequest(request);
  if (csrfResponse) return csrfResponse;

  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;

  if (!token) {
    return NextResponse.json(createErrorResponse("LOGIN_REQUIRED"), {
      status: 401,
    });
  }

  const submittedFormValues = await readSubmittedSajuFormValue(request);
  const formValues =
    submittedFormValues ??
    readPendingSajuFormValue(
      cookieStore.get(SAJU_PENDING_FORM_COOKIE_KEY)?.value,
    );

  if (!formValues) {
    return NextResponse.json(createErrorResponse("PENDING_FORM_NOT_FOUND"), {
      status: 400,
    });
  }

  const postResult = await onSajuPostOnServer(formValues);
  if (!postResult.success) {
    return NextResponse.json(
      createErrorResponse("SAJU_SAVE_FAILED", postResult.message),
      { status: postResult.status },
    );
  }

  const response = NextResponse.json(
    createSuccessResponse(postResult.data, undefined, "SAJU_SAVED"),
  );

  response.cookies.set(SAJU_PENDING_FORM_COOKIE_KEY, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
