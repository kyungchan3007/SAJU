"use client";

import { useState } from "react";
import type { SajuManageFormValues } from "@/features/mypage/model/sajuManage";
import {
  createSajuManageFormState,
  isSajuManageFormSubmittable,
  type SajuManageFormState,
  toSajuManagePayload,
} from "@/features/mypage/model/sajuManageForm";
import type { SajuRequest } from "@/generated/api";

type UseSajuManageFormParams = {
  initialValues: SajuManageFormValues;
  onSave: (payload: SajuRequest) => void;
};

export function useSajuManageForm({
  initialValues,
  onSave,
}: UseSajuManageFormParams) {
  const [formState, setFormState] = useState(() =>
    createSajuManageFormState(initialValues),
  );

  function updateField<K extends keyof SajuManageFormState>(
    field: K,
    value: SajuManageFormState[K],
  ) {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function toggleTimeUnknown() {
    setFormState((prev) => ({
      ...prev,
      timeUnknown: !prev.timeUnknown,
    }));
  }

  function submit() {
    const payload = toSajuManagePayload(formState);

    if (!payload) {
      return;
    }

    onSave(payload);
  }

  return {
    formState,
    isSubmittable: isSajuManageFormSubmittable(formState),
    updateField,
    toggleTimeUnknown,
    submit,
  };
}
