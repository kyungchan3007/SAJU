import type { ApiEnvelope } from "@/shared/api";
import { NOTIFICATIONS_UNREAD_COUNT_ENDPOINT_PATH } from "@/shared/config/endPoint";

export async function fetchUnreadNotificationCountOnClient(): Promise<
  ApiEnvelope<number | undefined>
> {
  const response = await fetch(NOTIFICATIONS_UNREAD_COUNT_ENDPOINT_PATH, {
    method: "GET",
  });
  const result = (await response.json()) as ApiEnvelope<number | undefined>;

  if (!response.ok) {
    throw new Error(
      result.success
        ? "Failed to fetch unread notification count."
        : result.error.message,
    );
  }

  return result;
}
