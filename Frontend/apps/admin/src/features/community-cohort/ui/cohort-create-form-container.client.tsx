"use client";

import { useState } from "react";
import { useCohortCreate } from "@/features/community-cohort/hooks/useCohortCreate";
import { CohortCreateForm, type CohortCreateFormValues } from "./cohort-create-form";

const EMPTY_FORM: CohortCreateFormValues = {
  name: "",
  capacity: "",
  expiredAt: "",
  openChatUrl: "",
};

export function CohortCreateFormContainer() {
  const [values, setValues] = useState<CohortCreateFormValues>(EMPTY_FORM);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isPending } = useCohortCreate(() => setValues(EMPTY_FORM));

  function handleChange(field: keyof CohortCreateFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrorMessage(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const capacity = Number(values.capacity);
    if (!values.name.trim()) {
      setErrorMessage("기수명을 입력해주세요.");
      return;
    }
    if (!capacity || capacity < 1) {
      setErrorMessage("정원은 1명 이상이어야 합니다.");
      return;
    }

    mutate({
      name: values.name.trim(),
      capacity,
      expiredAt: values.expiredAt || undefined,
      openChatUrl: values.openChatUrl || undefined,
    });
  }

  return (
    <CohortCreateForm
      values={values}
      errorMessage={errorMessage}
      isPending={isPending}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
