import "server-only";

import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { SAJU_USERS_ME_RESTORE_PATH } from "@/shared/config/endPoint";

type RestoreMyAccountOnServerSuccess = {
  success: true;
};

type RestoreMyAccountOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type RestoreMyAccountOnServerResult =
  | RestoreMyAccountOnServerSuccess
  | RestoreMyAccountOnServerFailure;

export async function restoreMyAccountOnServer(): Promise<RestoreMyAccountOnServerResult> {
  const result = await authenticatedBackendFetch(SAJU_USERS_ME_RESTORE_PATH, {
    method: "POST",
  });

  const parsed = await parseBackendApiResponse<void>(
    result.response,
    "Restore account request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true };
}
