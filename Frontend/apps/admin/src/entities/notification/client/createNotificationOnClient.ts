import type { NotificationCreateRequest } from "@/features/notification/type/types";
import { ADMIN_NOTIFICATIONS_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function createNotificationOnClient(
  body: NotificationCreateRequest,
): Promise<void> {
  const res = await fetch(ADMIN_NOTIFICATIONS_ENDPOINT_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? "알림 등록 실패");
  }
}
