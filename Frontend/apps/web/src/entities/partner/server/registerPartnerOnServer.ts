import "server-only";

import type { PartnerRequest, PartnerResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_PARTNERS_PATH } from "@/shared/config/endPoint";

type RegisterPartnerOnServerSuccess = {
  success: true;
  data: PartnerResponse | undefined;
};

type RegisterPartnerOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type RegisterPartnerOnServerResult =
  | RegisterPartnerOnServerSuccess
  | RegisterPartnerOnServerFailure;

export async function registerPartnerOnServer(
  payload: PartnerRequest,
): Promise<RegisterPartnerOnServerResult> {
  const result = await authenticatedBackendFetch(SAJU_PARTNERS_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const parsed = await parseBackendApiResponse<PartnerResponse>(
    result.response,
    "Register partner request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
