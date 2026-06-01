import "server-only";

import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { NOTIFICATIONS_READ_ENDPOINT_PATH } from "@/shared/config/endPoint";

type MarkNotificationAsReadOnServerSuccess = {
  success: true;
};

type MarkNotificationAsReadOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type MarkNotificationAsReadOnServerResult =
  | MarkNotificationAsReadOnServerSuccess
  | MarkNotificationAsReadOnServerFailure;

export async function markNotificationAsReadOnServer(
  notificationId: number,
): Promise<MarkNotificationAsReadOnServerResult> {
  const result = await authenticatedBackendFetch(
    `${NOTIFICATIONS_READ_ENDPOINT_PATH}/${notificationId}/read`,
    { method: "POST" },
  );

  const parsed = await parseBackendApiResponse<void>(
    result.response,
    "Mark notification as read request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true };
}
