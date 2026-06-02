import "server-only";

import type { PartnerListResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_PARTNERS_PATH } from "@/shared/config/endPoint";

type GetPartnersOnServerSuccess = {
  success: true;
  data: PartnerListResponse | undefined;
};

type GetPartnersOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetPartnersOnServerResult =
  | GetPartnersOnServerSuccess
  | GetPartnersOnServerFailure;

export async function getPartnersOnServer(): Promise<GetPartnersOnServerResult> {
  const result = await authenticatedBackendFetch(SAJU_PARTNERS_PATH, {
    method: "GET",
  });

  const parsed = await parseBackendApiResponse<PartnerListResponse>(
    result.response,
    "Get partners request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
