import type { NotificationCreateRequest } from "@/features/notification/type/types";

export async function createNotificationOnClient(body: NotificationCreateRequest): Promise<void> {
  const res = await fetch("/api/admin/notifications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(data.message ?? "알림 등록 실패");
  }
}
