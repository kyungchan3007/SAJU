import "server-only";

import type { PartnerRequest, PartnerResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_PARTNERS_PATH } from "@/shared/config/endPoint";

type UpdatePartnerOnServerSuccess = {
  success: true;
  data: PartnerResponse | undefined;
};

type UpdatePartnerOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type UpdatePartnerOnServerResult =
  | UpdatePartnerOnServerSuccess
  | UpdatePartnerOnServerFailure;

export async function updatePartnerOnServer(
  partnerId: number,
  payload: PartnerRequest,
): Promise<UpdatePartnerOnServerResult> {
  const result = await authenticatedBackendFetch(
    `${SAJU_PARTNERS_PATH}/${partnerId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const parsed = await parseBackendApiResponse<PartnerResponse>(
    result.response,
    "Update partner request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
