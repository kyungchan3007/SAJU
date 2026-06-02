import type { NotificationResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export async function fetchNotificationsOnClient(): Promise<
  ApiEnvelope<NotificationResponse[] | undefined>
> {
  const response = await fetch("/api/notifications", { method: "GET" });
  const result = (await response.json()) as ApiEnvelope<
    NotificationResponse[] | undefined
  >;

  if (!response.ok) {
    throw new Error(
      result.success ? "Failed to fetch notifications." : result.error.message,
    );
  }

  return result;
}
