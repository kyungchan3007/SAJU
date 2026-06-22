import "server-only";

import type { NotificationCreateRequest } from "@/features/notification/type/types";
import { authenticatedBackendFetch } from "@/shared/api/auth/authenticatedBackendFetch";
import { parseBackendApiResponse } from "@/shared/api/backend/parseBackendApiResponse";
import { ADMIN_NOTIFICATIONS_ENDPOINT_PATH } from "@/shared/config/endPoint";

type Result =
  | { success: true }
  | { success: false; status: number; message: string };

export async function createNotificationOnServer(
  body: NotificationCreateRequest,
): Promise<Result> {
  const result = await authenticatedBackendFetch(
    ADMIN_NOTIFICATIONS_ENDPOINT_PATH,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );

  if (result.response.status === 204) return { success: true };

  const parsed = await parseBackendApiResponse<void>(
    result.response,
    "알림 등록 실패",
  );
  if (!parsed.success) return parsed;

  return { success: true };
}
