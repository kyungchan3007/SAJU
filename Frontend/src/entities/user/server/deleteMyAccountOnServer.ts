import "server-only";

import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_USERS_ME_PATH } from "@/shared/config/endPoint";

type DeleteMyAccountOnServerSuccess = {
  success: true;
};

type DeleteMyAccountOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type DeleteMyAccountOnServerResult =
  | DeleteMyAccountOnServerSuccess
  | DeleteMyAccountOnServerFailure;

export async function deleteMyAccountOnServer(): Promise<DeleteMyAccountOnServerResult> {
  const result = await authenticatedBackendFetch(SAJU_USERS_ME_PATH, {
    method: "DELETE",
  });

  const parsed = await parseBackendApiResponse<void>(
    result.response,
    "Delete account request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true };
}
