import "server-only";

import type { YearFortuneResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import {
  parseGeneratedInterpretationResponse,
  type GeneratedInterpretationMeta,
} from "@/shared/api/backend/parseGeneratedInterpretationResponse";
import { SAJU_YEAR_FORTUNE_ENDPOINT_PATH } from "@/shared/config/endPoint";

type GetMyYearFortuneOnServerSuccess = {
  success: true;
  data: YearFortuneResponse | undefined;
  meta: GeneratedInterpretationMeta;
};

type GetMyYearFortuneOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetMyYearFortuneOnServerResult =
  | GetMyYearFortuneOnServerSuccess
  | GetMyYearFortuneOnServerFailure;

export async function getMyYearFortuneOnServer(): Promise<GetMyYearFortuneOnServerResult> {
  const result = await authenticatedBackendFetch(
    SAJU_YEAR_FORTUNE_ENDPOINT_PATH,
    {
      method: "GET",
    },
  );

  const parsed =
    await parseGeneratedInterpretationResponse<YearFortuneResponse>(
      result.response,
      "Get year fortune request failed.",
    );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data, meta: parsed.meta };
}
