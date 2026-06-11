import "server-only";

import type { PersonalityProfileResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import {
  parseGeneratedInterpretationResponse,
  type GeneratedInterpretationMeta,
} from "@/shared/api/backend/parseGeneratedInterpretationResponse";
import { SAJU_PERSONALITY_ENDPOINT_PATH } from "@/shared/config/endPoint";

type GetMyPersonalityProfileOnServerSuccess = {
  success: true;
  data: PersonalityProfileResponse | undefined;
  meta: GeneratedInterpretationMeta;
};

type GetMyPersonalityProfileOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetMyPersonalityProfileOnServerResult =
  | GetMyPersonalityProfileOnServerSuccess
  | GetMyPersonalityProfileOnServerFailure;

export async function getMyPersonalityProfileOnServer(): Promise<GetMyPersonalityProfileOnServerResult> {
  const result = await authenticatedBackendFetch(
    SAJU_PERSONALITY_ENDPOINT_PATH,
    {
      method: "GET",
    },
  );

  const parsed =
    await parseGeneratedInterpretationResponse<PersonalityProfileResponse>(
      result.response,
      "Get personality profile request failed.",
    );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data, meta: parsed.meta };
}
