import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { onSajuDailyGetOnServer } from "@/entities/saju/server/onSajuDailyGetOnServer";
import { onSajuPostOnServer } from "@/entities/saju/server/onSajuPostOnServer";
import {
  encodeCachedDailyResult,
  readCachedDailyResult,
} from "@/entities/saju/server/sajuDailyCacheCookie";
import type { SajuFormValues } from "@/features/saju-input/type/type";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { withApiGuards } from "@/shared/api/auth/withApiGuards";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";
import {
  SAJU_DAILY_CACHE_COOKIE_KEY,
  SAJU_DAILY_CACHE_TTL_SEC,
  SAJU_PENDING_FORM_COOKIE_KEY,
} from "@/shared/config/sajuCookie";

export const revalidate = 60;

type PendingSajuForm = {
  formValues?: SajuFormValues;
  exp?: number;
};

async function readSubmittedFormValue(
  request: Request | undefined,
): Promise<SajuFormValues | null> {
  if (!request) {
    return null;
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return (await request.json()) as SajuFormValues;
  } catch {
    return null;
  }
}

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

function clearPendingFormCookie(response: NextResponse) {
  response.cookies.set(SAJU_PENDING_FORM_COOKIE_KEY, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export const POST = withApiGuards(
  { requireCsrf: true, requireTurnstile: true },
  async (request?: Request) => {
    const submittedFormValues = await readSubmittedFormValue(request);
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;

    if (!token) {
      return NextResponse.json(createErrorResponse("LOGIN_REQUIRED"), {
        status: 401,
      });
    }

    const cachedDailyResult = readCachedDailyResult(
      cookieStore.get(SAJU_DAILY_CACHE_COOKIE_KEY)?.value,
    );
    if (cachedDailyResult) {
      const response = NextResponse.json(
        createSuccessResponse(cachedDailyResult),
      );
      clearPendingFormCookie(response);
      return response;
    }

    const dailyResult = await onSajuDailyGetOnServer();
    if (dailyResult.success) {
      const response = NextResponse.json(createSuccessResponse(dailyResult.data));

      response.cookies.set(
        SAJU_DAILY_CACHE_COOKIE_KEY,
        encodeCachedDailyResult(dailyResult.data, SAJU_DAILY_CACHE_TTL_SEC),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: SAJU_DAILY_CACHE_TTL_SEC,
        },
      );
      clearPendingFormCookie(response);

      return response;
    }

    if (dailyResult.status === 404) {
      const formValues =
        submittedFormValues ??
        readPendingFormValue(
          cookieStore.get(SAJU_PENDING_FORM_COOKIE_KEY)?.value,
        );

      if (!formValues) {
        return NextResponse.json(
          createErrorResponse("PENDING_FORM_NOT_FOUND"),
          { status: 400 },
        );
      }

      const postResult = await onSajuPostOnServer(formValues);
      if (!postResult.success) {
        return NextResponse.json(
          createErrorResponse("SAJU_POST_FAILED", postResult.message),
          { status: postResult.status },
        );
      }

      const response = NextResponse.json(createSuccessResponse(postResult.data));

      response.cookies.set(
        SAJU_DAILY_CACHE_COOKIE_KEY,
        encodeCachedDailyResult(postResult.data, SAJU_DAILY_CACHE_TTL_SEC),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: SAJU_DAILY_CACHE_TTL_SEC,
        },
      );
      clearPendingFormCookie(response);

      return response;
    }

    if (!dailyResult.success) {
      return NextResponse.json(
        createErrorResponse("SAJU_DAILY_GET_FAILED", dailyResult.message),
        { status: dailyResult.status },
      );
    }

    return NextResponse.json(createErrorResponse("SAJU_DAILY_GET_FAILED"), {
      status: 500,
    });
  },
);
