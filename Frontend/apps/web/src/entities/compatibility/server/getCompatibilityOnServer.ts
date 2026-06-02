import "server-only";

import type { CompatibilityResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import {
  parseGeneratedInterpretationResponse,
  type GeneratedInterpretationMeta,
} from "@/shared/api/backend/parseGeneratedInterpretationResponse";
import { SAJU_COMPATIBILITY_ENDPOINT_PATH } from "@/shared/config/endPoint";

type GetCompatibilityOnServerSuccess = {
  success: true;
  data: CompatibilityResponse | undefined;
  meta: GeneratedInterpretationMeta;
};

type GetCompatibilityOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetCompatibilityOnServerResult =
  | GetCompatibilityOnServerSuccess
  | GetCompatibilityOnServerFailure;

export async function getCompatibilityOnServer(
  partnerId: number,
): Promise<GetCompatibilityOnServerResult> {
  const result = await authenticatedBackendFetch(
    `${SAJU_COMPATIBILITY_ENDPOINT_PATH}/${partnerId}`,
    {
      method: "GET",
    },
  );

  const parsed =
    await parseGeneratedInterpretationResponse<CompatibilityResponse>(
      result.response,
      "Get compatibility request failed.",
    );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data, meta: parsed.meta };
}
