import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { onSajuDailyGetOnServer } from "@/entities/saju/server/onSajuDailyGetOnServer";
import { onSajuPostOnServer } from "@/entities/saju/server/onSajuPostOnServer";
import type { SajuFormValues } from "@/features/saju-input/type/type";
import { createErrorResponse, createSuccessResponse } from "@/shared/api";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";

export const revalidate = 60;

const SAJU_PENDING_FORM_COOKIE_KEY = "saju_pending_form";
const SAJU_DAILY_CACHE_COOKIE_KEY = "saju_daily_cache";
const SAJU_DAILY_CACHE_TTL_SEC = 60 * 60;

type PendingSajuForm = {
  formValues?: SajuFormValues;
  exp?: number;
};

type CachedDailyResult = {
  data?: unknown;
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

function readCachedDailyResult(encoded: string | undefined): unknown | null {
  if (!encoded) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as CachedDailyResult;

    if (typeof parsed.exp !== "number" || parsed.exp < Date.now()) {
      return null;
    }

    return parsed.data ?? null;
  } catch {
    return null;
  }
}

function encodeCachedDailyResult(data: unknown): string {
  return Buffer.from(
    JSON.stringify({
      data,
      exp: Date.now() + SAJU_DAILY_CACHE_TTL_SEC * 1000,
    }),
    "utf8",
  ).toString("base64url");
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

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;

  if (!token) {
    return NextResponse.json(
      createErrorResponse("LOGIN_REQUIRED", "Login is required."),
      { status: 401 },
    );
  }

  // 1) 1시간 캐시가 유효하면 서버 호출 없이 즉시 반환
  const cachedDailyResult = readCachedDailyResult(
    cookieStore.get(SAJU_DAILY_CACHE_COOKIE_KEY)?.value,
  );
  if (cachedDailyResult) {
    const response = NextResponse.json(createSuccessResponse(cachedDailyResult));
    clearPendingFormCookie(response);
    return response;
  }

  // 2) 기본 흐름: 먼저 GET /api/saju/me/daily 조회 시도
  const dailyResult = await onSajuDailyGetOnServer();
  if (dailyResult.success) {
    const response = NextResponse.json(createSuccessResponse(dailyResult.data));

    // 3) GET 성공 응답을 1시간 캐시
    response.cookies.set(
      SAJU_DAILY_CACHE_COOKIE_KEY,
      encodeCachedDailyResult(dailyResult.data),
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

  // 4) GET에서 "아직 생성 데이터 없음(404)"이면 최초 회원 흐름으로 POST 실행
  if (dailyResult.status === 404) {
    const formValues = readPendingFormValue(
      cookieStore.get(SAJU_PENDING_FORM_COOKIE_KEY)?.value,
    );

    if (!formValues) {
      return NextResponse.json(
        createErrorResponse(
          "PENDING_FORM_NOT_FOUND",
          "First-time post requires pending saju form.",
        ),
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

    // 5) 최초 POST 성공 응답도 1시간 캐시 후 반환
    response.cookies.set(
      SAJU_DAILY_CACHE_COOKIE_KEY,
      encodeCachedDailyResult(postResult.data),
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

  // 6) 404 외 GET 실패는 그대로 에러 반환
  if (!dailyResult.success) {
    return NextResponse.json(
      createErrorResponse("SAJU_DAILY_GET_FAILED", dailyResult.message),
      { status: dailyResult.status },
    );
  }
}
