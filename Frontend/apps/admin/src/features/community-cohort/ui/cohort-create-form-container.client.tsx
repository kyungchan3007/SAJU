"use client";

import { useState } from "react";
import { useCohortCreate } from "@/features/community-cohort/hooks/useCohortCreate";
import { CohortCreateForm, type CohortCreateFormValues } from "./cohort-create-form";

const EMPTY_FORM: CohortCreateFormValues = {
  name: "",
  capacity: "",
  expiredAt: "",
  location: "",
  maleFeeAmount: "",
  femaleFeeAmount: "",
  bankName: "",
  bankAccountNumber: "",
  bankAccountHolder: "",
  finalizationDate: "",
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
    const maleFeeAmount = Number(values.maleFeeAmount);
    const femaleFeeAmount = Number(values.femaleFeeAmount);
    if (!values.name.trim()) {
      setErrorMessage("기수명을 입력해주세요.");
      return;
    }
    if (!capacity || capacity < 1) {
      setErrorMessage("정원은 1명 이상이어야 합니다.");
      return;
    }
    if (!values.expiredAt) {
      setErrorMessage("소개팅 날짜를 입력해주세요.");
      return;
    }
    if (!Number.isFinite(maleFeeAmount) || maleFeeAmount < 0) {
      setErrorMessage("남성 참가비는 0원 이상이어야 합니다.");
      return;
    }
    if (!Number.isFinite(femaleFeeAmount) || femaleFeeAmount < 0) {
      setErrorMessage("여성 참가비는 0원 이상이어야 합니다.");
      return;
    }
    if (!values.bankName.trim()) {
      setErrorMessage("입금 은행명을 입력해주세요.");
      return;
    }
    if (!values.bankAccountNumber.trim()) {
      setErrorMessage("입금 계좌번호를 입력해주세요.");
      return;
    }
    if (!values.bankAccountHolder.trim()) {
      setErrorMessage("입금 예금주를 입력해주세요.");
      return;
    }

    mutate({
      name: values.name.trim(),
      capacity,
      expiredAt: values.expiredAt,
      location: values.location.trim() || null,
      maleFeeAmount,
      femaleFeeAmount,
      bankName: values.bankName.trim(),
      bankAccountNumber: values.bankAccountNumber.trim(),
      bankAccountHolder: values.bankAccountHolder.trim(),
      finalizationDate: values.finalizationDate || null,
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
