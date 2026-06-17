export type NotificationType = "ANNOUNCEMENT" | "NEW_SERVICE";

export type NotificationCreateRequest = {
  title: string;
  content: string;
  type: NotificationType;
};
