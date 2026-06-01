"use client";

import type { FocusEvent } from "react";
import { Bell } from "lucide-react";

import type { NotificationResponse } from "@/generated/api";
import { cn } from "@/shared/lib/utils";

import { useNotificationCenter } from "../hooks/useNotificationCenter";

export function NotificationBell() {
  const {
    isOpen,
    open,
    close,
    unreadCount,
    notifications,
    isNotificationsLoading,
    notificationsError,
    markAsRead,
  } = useNotificationCenter();

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      close();
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={open}
      onMouseLeave={close}
      onFocus={open}
      onBlur={handleBlur}
    >
      <button
        type="button"
        className="relative flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
        aria-label="알림"
        aria-expanded={isOpen}
      >
        <Bell size={17} strokeWidth={1.8} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-status-danger px-1 text-[10px] font-black leading-4 text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 z-50 w-[320px] overflow-hidden rounded-xl border border-surface-border bg-surface-card shadow-saju-dropdown">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <p className="text-sm font-black text-gray-900">알림</p>
            {unreadCount > 0 && (
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-bold text-red-600">
                안읽음 {unreadCount}
              </span>
            )}
          </div>

          <NotificationList
            notifications={notifications}
            isLoading={isNotificationsLoading}
            error={notificationsError}
            onReadNotification={markAsRead}
          />
        </div>
      )}
    </div>
  );
}

function NotificationList({
  notifications,
  isLoading,
  error,
  onReadNotification,
}: {
  notifications: NotificationResponse[];
  isLoading: boolean;
  error: Error | null;
  onReadNotification: (notification: NotificationResponse) => void;
}) {
  if (isLoading) {
    return (
      <div className="px-4 py-6 text-center text-sm font-semibold text-gray-500">
        알림을 불러오는 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6 text-center text-sm font-semibold text-red-500">
        알림을 불러오지 못했어요.
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-sm font-semibold text-gray-500">
        아직 알림이 없어요.
      </div>
    );
  }

  return (
    <div className="max-h-[360px] overflow-y-auto py-1">
      {notifications.map((notification) => (
        <NotificationListItem
          key={notification.id ?? `${notification.title}-${notification.createdAt}`}
          notification={notification}
          onReadNotification={onReadNotification}
        />
      ))}
    </div>
  );
}

function NotificationListItem({
  notification,
  onReadNotification,
}: {
  notification: NotificationResponse;
  onReadNotification: (notification: NotificationResponse) => void;
}) {
  const isRead = notification.read === true;

  return (
    <button
      type="button"
      disabled={isRead || !notification.id}
      onClick={() => onReadNotification(notification)}
      className={cn(
        "block w-full border-b border-gray-50 px-4 py-3 text-left transition last:border-b-0",
        isRead ? "bg-white" : "bg-saju-soft",
        !isRead && notification.id && "hover:bg-saju-tint",
        (isRead || !notification.id) && "cursor-default",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
            isRead ? "bg-gray-300" : "bg-saju-primary",
          )}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p
              className={cn(
                "truncate text-sm",
                isRead
                  ? "font-semibold text-gray-600"
                  : "font-black text-gray-950",
              )}
            >
              {notification.title ?? "알림"}
            </p>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold",
                isRead
                  ? "bg-gray-100 text-gray-500"
                  : "bg-saju-primary text-white",
              )}
            >
              {isRead ? "읽음" : "안읽음"}
            </span>
          </div>
          {notification.content && (
            <p
              className={cn(
                "mt-1 line-clamp-2 text-xs leading-5",
                isRead ? "text-gray-500" : "text-gray-800",
              )}
            >
              {notification.content}
            </p>
          )}
          {notification.createdAt && (
            <p className="mt-1 text-[11px] font-medium text-gray-400">
              {formatNotificationDate(notification.createdAt)}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

function formatNotificationDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
