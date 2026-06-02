import "server-only";

import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { NOTIFICATIONS_UNREAD_COUNT_ENDPOINT_PATH } from "@/shared/config/endPoint";

type GetUnreadNotificationCountOnServerSuccess = {
  success: true;
  data: number | undefined;
};

type GetUnreadNotificationCountOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetUnreadNotificationCountOnServerResult =
  | GetUnreadNotificationCountOnServerSuccess
  | GetUnreadNotificationCountOnServerFailure;

export async function getUnreadNotificationCountOnServer(): Promise<GetUnreadNotificationCountOnServerResult> {
  const result = await authenticatedBackendFetch(
    NOTIFICATIONS_UNREAD_COUNT_ENDPOINT_PATH,
    { method: "GET" },
  );

  const parsed = await parseBackendApiResponse<number>(
    result.response,
    "Get unread notification count request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
