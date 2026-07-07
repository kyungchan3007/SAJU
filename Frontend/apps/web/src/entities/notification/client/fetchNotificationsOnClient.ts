import type { NotificationResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";
import { NOTIFICATIONS_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function fetchNotificationsOnClient(): Promise<
  ApiEnvelope<NotificationResponse[] | undefined>
> {
  const response = await fetch(NOTIFICATIONS_ENDPOINT_PATH, { method: "GET" });
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
