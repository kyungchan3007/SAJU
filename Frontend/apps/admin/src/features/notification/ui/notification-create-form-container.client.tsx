"use client";

import { useState } from "react";
import { useNotificationCreate } from "@/features/notification/hooks/useNotificationCreate";
import {
  NotificationCreateForm,
  type NotificationFormValues,
} from "./notification-create-form";
import type { NotificationType } from "@/features/notification/type/types";

const EMPTY_FORM: NotificationFormValues = {
  title: "",
  content: "",
  type: "",
};

export function NotificationCreateFormContainer() {
  const [values, setValues] = useState<NotificationFormValues>(EMPTY_FORM);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isPending } = useNotificationCreate(() => setValues(EMPTY_FORM));

  function handleChange(field: keyof NotificationFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrorMessage(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!values.type) {
      setErrorMessage("알림 유형을 선택해주세요.");
      return;
    }
    if (!values.title.trim()) {
      setErrorMessage("제목을 입력해주세요.");
      return;
    }
    if (!values.content.trim()) {
      setErrorMessage("내용을 입력해주세요.");
      return;
    }

    mutate({
      title: values.title.trim(),
      content: values.content.trim(),
      type: values.type as NotificationType,
    });
  }

  return (
    <NotificationCreateForm
      values={values}
      errorMessage={errorMessage}
      isPending={isPending}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
