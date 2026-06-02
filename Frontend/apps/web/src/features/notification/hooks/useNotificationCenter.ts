"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuthScope } from "@/shared/app-infra/query-provider/auth-scope-context";
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
  const authScope = useAuthScope();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const notificationsQueryKey = [...NOTIFICATIONS_QUERY_KEY, authScope] as const;
  const unreadCountQueryKey = [
    ...NOTIFICATIONS_UNREAD_COUNT_QUERY_KEY,
    authScope,
  ] as const;

  const unreadCountQuery = useQuery({
    queryKey: unreadCountQueryKey,
    queryFn: fetchUnreadNotificationCountOnClient,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });

  const notificationsQuery = useQuery({
    queryKey: notificationsQueryKey,
    queryFn: fetchNotificationsOnClient,
    enabled: isOpen,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsReadOnClient,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: notificationsQueryKey });
      await queryClient.cancelQueries({ queryKey: unreadCountQueryKey });

      const previousNotifications =
        queryClient.getQueryData<ApiEnvelope<NotificationResponse[] | undefined>>(
          notificationsQueryKey,
        );
      const previousUnreadCount =
        queryClient.getQueryData<ApiEnvelope<number | undefined>>(
          unreadCountQueryKey,
        );
      const targetWasUnread =
        previousNotifications?.success &&
        previousNotifications.data?.some(
          (notification) =>
            notification.id === notificationId && notification.read !== true,
        );

      if (previousNotifications?.success) {
        queryClient.setQueryData<ApiEnvelope<NotificationResponse[] | undefined>>(
          notificationsQueryKey,
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
          unreadCountQueryKey,
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
          notificationsQueryKey,
          context.previousNotifications,
        );
      }

      if (context?.previousUnreadCount) {
        queryClient.setQueryData(
          unreadCountQueryKey,
          context.previousUnreadCount,
        );
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: notificationsQueryKey });
      void queryClient.invalidateQueries({ queryKey: unreadCountQueryKey });
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
