import "server-only";

import type { NotificationResponse } from "@/generated/api";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { NOTIFICATIONS_ENDPOINT_PATH } from "@/shared/config/endPoint";

type GetNotificationsOnServerSuccess = {
  success: true;
  data: NotificationResponse[] | undefined;
};

type GetNotificationsOnServerFailure = {
  success: false;
  status: number;
  message: string;
};

type GetNotificationsOnServerResult =
  | GetNotificationsOnServerSuccess
  | GetNotificationsOnServerFailure;

export async function getNotificationsOnServer(): Promise<GetNotificationsOnServerResult> {
  const result = await authenticatedBackendFetch(NOTIFICATIONS_ENDPOINT_PATH, {
    method: "GET",
  });

  const parsed = await parseBackendApiResponse<NotificationResponse[]>(
    result.response,
    "Get notifications request failed.",
  );

  if (!parsed.success) {
    return parsed;
  }

  return { success: true, data: parsed.data };
}
