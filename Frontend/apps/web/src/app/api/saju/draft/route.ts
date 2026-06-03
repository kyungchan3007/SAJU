import { NextRequest, NextResponse } from "next/server";
import type { SajuFormValues } from "@/features/saju-input/type/type";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { rejectCrossOriginRequest } from "@/shared/api/auth/rejectCrossOriginRequest";

const SAJU_PENDING_FORM_COOKIE_KEY = "saju_pending_form";
const PENDING_TTL_SEC = 60 * 10;

export async function POST(req: NextRequest) {
  const csrfResponse = rejectCrossOriginRequest(req);
  if (csrfResponse) return csrfResponse;

  let formValues: SajuFormValues;

  try {
    formValues = (await req.json()) as SajuFormValues;
  } catch {
    return NextResponse.json(
      createErrorResponse("INVALID_BODY", "Invalid saju form body."),
      { status: 400 },
    );
  }

  const encoded = Buffer.from(
    JSON.stringify({ formValues, exp: Date.now() + PENDING_TTL_SEC * 1000 }),
    "utf8",
  ).toString("base64url");

  const res = NextResponse.json(createSuccessResponse({ saved: true }));
  res.cookies.set(SAJU_PENDING_FORM_COOKIE_KEY, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PENDING_TTL_SEC,
  });
  return res;
}
