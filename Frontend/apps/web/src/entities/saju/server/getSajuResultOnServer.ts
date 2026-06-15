import "server-only";

import { cookies } from "next/headers";
import type { SajuFormValues } from "@/features/saju-input/type/type";
import type { DailyEnergyResponse } from "@/generated/api";
import { onSajuDailyGetOnServer } from "@/entities/saju/server/onSajuDailyGetOnServer";
import { onSajuPostOnServer } from "@/entities/saju/server/onSajuPostOnServer";
import { normalizeDailyEnergyResponse } from "@/entities/saju/server/normalizeDailyEnergyResponse";
import { readCachedDailyResult } from "@/entities/saju/server/sajuDailyCacheCookie";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/shared/config/authToken";
import {
  SAJU_DAILY_CACHE_COOKIE_KEY,
  SAJU_PENDING_FORM_COOKIE_KEY,
} from "@/shared/config/sajuCookie";

type PendingSajuForm = {
  formValues?: SajuFormValues;
  exp?: number;
};

type SajuResultGetSuccess = {
  success: true;
  data: DailyEnergyResponse | undefined;
};

type SajuResultGetFailure = {
  success: false;
  status: number;
  message: string;
  reason: "LOGIN_REQUIRED" | "PENDING_FORM_REQUIRED" | "REQUEST_FAILED";
};

export type SajuResultGetResult = SajuResultGetSuccess | SajuResultGetFailure;

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

export async function getSajuResultOnServer(): Promise<SajuResultGetResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY)?.value;

  if (!token) {
    return {
      success: false,
      status: 401,
      message: "로그인이 필요합니다.",
      reason: "LOGIN_REQUIRED",
    };
  }

  const cachedDailyResult = normalizeDailyEnergyResponse(
    readCachedDailyResult(cookieStore.get(SAJU_DAILY_CACHE_COOKIE_KEY)?.value),
  );
  if (cachedDailyResult) {
    return {
      success: true,
      data: cachedDailyResult,
    };
  }

  const authOptions = { refreshOnUnauthorized: false };
  const dailyResult = await onSajuDailyGetOnServer(authOptions);

  if (dailyResult.success) {
    return dailyResult;
  }

  if (dailyResult.status !== 404) {
    return {
      ...dailyResult,
      reason: "REQUEST_FAILED",
    };
  }

  const formValues = readPendingFormValue(
    cookieStore.get(SAJU_PENDING_FORM_COOKIE_KEY)?.value,
  );

  if (!formValues) {
    return {
      success: false,
      status: 400,
      message: "First-time post requires pending saju form.",
      reason: "PENDING_FORM_REQUIRED",
    };
  }

  const postResult = await onSajuPostOnServer(formValues, authOptions);

  if (postResult.success) {
    return postResult;
  }

  return {
    ...postResult,
    reason: "REQUEST_FAILED",
  };
}
