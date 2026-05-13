import "server-only";

import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_PARTNERS_PATH } from "@/shared/config/endPoint";

type DeletePartnerOnServerSuccess = {
  success: true;
};

type DeletePartnerOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type DeletePartnerOnServerResult =
  | DeletePartnerOnServerSuccess
  | DeletePartnerOnServerFailure;

export async function deletePartnerOnServer(
  partnerId: number,
): Promise<DeletePartnerOnServerResult> {
  const result = await authenticatedBackendFetch(
    `${SAJU_PARTNERS_PATH}/${partnerId}`,
    {
      method: "DELETE",
    },
  );

  const parsed = await parseBackendApiResponse<void>(
    result.response,
    "Delete partner request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true };
}
