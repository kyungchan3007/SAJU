"use client";

import { useState } from "react";

import { getFirstIncompleteFieldMessage } from "@/features/saju-input/model/utils";
import type { SajuFormValues } from "@/features/saju-input/type/type";

const defaultValidationToastMessage = {
  title: "입력 항목을 모두 확인해주세요.",
  description:
    "필수 입력과 개인정보 수집·이용 동의를 완료해야 진행할 수 있습니다.",
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
