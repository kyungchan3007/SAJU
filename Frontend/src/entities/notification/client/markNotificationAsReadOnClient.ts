import type { ApiEnvelope } from "@/shared/api";

export async function markNotificationAsReadOnClient(
  notificationId: number,
): Promise<ApiEnvelope<{ read: true }>> {
  const response = await fetch(`/api/notifications/${notificationId}/read`, {
    method: "POST",
  });
  const result = (await response.json()) as ApiEnvelope<{ read: true }>;

  if (!response.ok) {
    throw new Error(
      result.success
        ? "Failed to mark notification as read."
        : result.error.message,
    );
  }

  return result;
}
