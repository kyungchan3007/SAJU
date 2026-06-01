import type { ApiEnvelope } from "@/shared/api";

export async function fetchUnreadNotificationCountOnClient(): Promise<
  ApiEnvelope<number | undefined>
> {
  const response = await fetch("/api/notifications/unread-count", {
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
