"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchNotificationsOnClient } from "@/entities/notification/client/fetchNotificationsOnClient";
import { fetchUnreadNotificationCountOnClient } from "@/entities/notification/client/fetchUnreadNotificationCountOnClient";
import { markNotificationAsReadOnClient } from "@/entities/notification/client/markNotificationAsReadOnClient";
import type { NotificationResponse } from "@/generated/api";
import type { ApiEnvelope } from "@/shared/api";

export const NOTIFICATIONS_QUERY_KEY = ["notifications"] as const;
export const NOTIFICATIONS_UNREAD_COUNT_QUERY_KEY = [
  "notifications",
  "unread-count",
] as const;

export function useNotificationCenter() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCountQuery = useQuery({
    queryKey: NOTIFICATIONS_UNREAD_COUNT_QUERY_KEY,
    queryFn: fetchUnreadNotificationCountOnClient,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });

  const notificationsQuery = useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: fetchNotificationsOnClient,
    enabled: isOpen,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsReadOnClient,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
      await queryClient.cancelQueries({
        queryKey: NOTIFICATIONS_UNREAD_COUNT_QUERY_KEY,
      });

      const previousNotifications =
        queryClient.getQueryData<ApiEnvelope<NotificationResponse[] | undefined>>(
          NOTIFICATIONS_QUERY_KEY,
        );
      const previousUnreadCount =
        queryClient.getQueryData<ApiEnvelope<number | undefined>>(
          NOTIFICATIONS_UNREAD_COUNT_QUERY_KEY,
        );
      const targetWasUnread =
        previousNotifications?.success &&
        previousNotifications.data?.some(
          (notification) =>
            notification.id === notificationId && notification.read !== true,
        );

      if (previousNotifications?.success) {
        queryClient.setQueryData<ApiEnvelope<NotificationResponse[] | undefined>>(
          NOTIFICATIONS_QUERY_KEY,
          {
            ...previousNotifications,
            data: previousNotifications.data?.map((notification) =>
              notification.id === notificationId
                ? { ...notification, read: true }
                : notification,
            ),
          },
        );
      }

      if (targetWasUnread && previousUnreadCount?.success) {
        queryClient.setQueryData<ApiEnvelope<number | undefined>>(
          NOTIFICATIONS_UNREAD_COUNT_QUERY_KEY,
          {
            ...previousUnreadCount,
            data: Math.max(0, (previousUnreadCount.data ?? 0) - 1),
          },
        );
      }

      return { previousNotifications, previousUnreadCount };
    },
    onError: (_error, _notificationId, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          NOTIFICATIONS_QUERY_KEY,
          context.previousNotifications,
        );
      }

      if (context?.previousUnreadCount) {
        queryClient.setQueryData(
          NOTIFICATIONS_UNREAD_COUNT_QUERY_KEY,
          context.previousUnreadCount,
        );
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: NOTIFICATIONS_UNREAD_COUNT_QUERY_KEY,
      });
    },
  });

  function markAsRead(notification: NotificationResponse) {
    if (!notification.id || notification.read === true) {
      return;
    }

    markAsReadMutation.mutate(notification.id);
  }

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    unreadCount: unreadCountQuery.data?.success
      ? (unreadCountQuery.data.data ?? 0)
      : 0,
    notifications: notificationsQuery.data?.success
      ? (notificationsQuery.data.data ?? [])
      : [],
    isNotificationsLoading: notificationsQuery.isLoading,
    notificationsError: notificationsQuery.error,
    markAsRead,
  };
}
