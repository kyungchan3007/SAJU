"use client";

import { useState } from "react";

import { getFirstIncompleteFieldMessage } from "@/features/saju-input/model/utils";
import type { SajuFormValues } from "@/features/saju-input/type/type";

const defaultValidationToastMessage = {
  title: "4단계 입력을 완료해 주세요",
  description: "모든 항목을 채우면 오늘의 기운 보기가 가능합니다.",
};

export function useSajuValidationToast(formValues: SajuFormValues) {
  const [isValidationToastOpen, setValidationToastOpen] = useState(false);
  const [validationToastMessage, setValidationToastMessage] = useState(
    defaultValidationToastMessage,
  );

  const showValidationToast = () => {
    setValidationToastMessage(getFirstIncompleteFieldMessage(formValues));
    setValidationToastOpen(false);
    requestAnimationFrame(() => {
      setValidationToastOpen(true);
    });
  };

  return {
    isValidationToastOpen,
    setValidationToastOpen,
    validationToastMessage,
    showValidationToast,
  };
}
