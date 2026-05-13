import "server-only";

import type { PartnerResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_PARTNERS_PATH } from "@/shared/config/endPoint";

type GetPartnerOnServerSuccess = {
  success: true;
  data: PartnerResponse | undefined;
};

type GetPartnerOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetPartnerOnServerResult =
  | GetPartnerOnServerSuccess
  | GetPartnerOnServerFailure;

export async function getPartnerOnServer(
  partnerId: number,
): Promise<GetPartnerOnServerResult> {
  const result = await authenticatedBackendFetch(
    `${SAJU_PARTNERS_PATH}/${partnerId}`,
    {
      method: "GET",
    },
  );

  const parsed = await parseBackendApiResponse<PartnerResponse>(
    result.response,
    "Get partner request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
