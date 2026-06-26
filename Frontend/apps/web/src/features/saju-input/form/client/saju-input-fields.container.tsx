"use client";

import type { Route } from "next";
import { useSajuConsentStatus } from "@/features/saju-input/hooks/useSajuConsentStatus";
import { useSajuInputForm } from "@/features/saju-input/hooks/useSajuInputForm";

import { SajuInputFields } from "./saju-input-fields.client";

type SajuInputFieldsContainerProps = {
  nextPath?: Route | null;
};

export function SajuInputFieldsContainer({
  nextPath,
}: SajuInputFieldsContainerProps) {
  const { isConsentAlreadyGiven } = useSajuConsentStatus();
  const {
    formValues,
    highlightedZodiac,
    highlightedZodiacIndex,
    isFormComplete,
    updateField,
    touchStep,
    submitStatus,
    submitSaju,
  } = useSajuInputForm({ nextPath, isConsentAlreadyGiven });

  return (
    <SajuInputFields
      formValues={formValues}
      highlightedZodiac={highlightedZodiac}
      highlightedZodiacIndex={highlightedZodiacIndex}
      onChangeField={updateField}
      onTouchStep={touchStep}
      showConsentSection={!isConsentAlreadyGiven}
      isFormComplete={isFormComplete}
      submitStatus={submitStatus}
      onSubmitSaju={submitSaju}
    />
  );
}
