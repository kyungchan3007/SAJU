import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { onSajuPostOnServer } from "@/entities/saju/server/onSajuPostOnServer";
import type { SajuFormValues } from "@/features/saju-input/type/type";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";

export const revalidate = 60;

const SAJU_PENDING_FORM_COOKIE_KEY = "saju_pending_form";

type PendingSajuForm = {
  formValues?: SajuFormValues;
  exp?: number;
};

function readPendingFormValue(
  encoded: string | undefined,
): SajuFormValues | null {
  if (!encoded) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as PendingSajuForm;

    if (!parsed.formValues || typeof parsed.exp !== "number") {
      return null;
    }

    if (parsed.exp < Date.now()) {
      return null;
    }

    return parsed.formValues;
  } catch {
    return null;
  }
}

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("saju_access_token")?.value;

  if (!token) {
    return NextResponse.json(
      createErrorResponse("LOGIN_REQUIRED", "Login is required."),
      { status: 401 },
    );
  }

  const formValues = readPendingFormValue(
    cookieStore.get(SAJU_PENDING_FORM_COOKIE_KEY)?.value,
  );

  if (!formValues) {
    return NextResponse.json(
      createErrorResponse(
        "PENDING_FORM_NOT_FOUND",
        "Pending saju form not found.",
      ),
      { status: 400 },
    );
  }

  const result = await onSajuPostOnServer(formValues, token);

  if (!result.success) {
    return NextResponse.json(
      createErrorResponse("SAJU_POST_FAILED", result.message),
      { status: result.status },
    );
  }

  const response = NextResponse.json(createSuccessResponse(result.data));
  response.cookies.set(SAJU_PENDING_FORM_COOKIE_KEY, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
