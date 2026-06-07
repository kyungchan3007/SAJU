"use client";

import type { Route } from "next";
import { useSajuInputForm } from "@/features/saju-input/hooks/useSajuInputForm";
import type { InputStepItem } from "@/features/saju-input/step/step";

import { SajuInputFields } from "./saju-input-fields.client";

type SajuInputFieldsContainerProps = {
  steps: InputStepItem[];
  nextPath?: Route | null;
};

export function SajuInputFieldsContainer({
  steps,
  nextPath,
}: SajuInputFieldsContainerProps) {
  const {
    formValues,
    stepStates,
    highlightedZodiac,
    highlightedZodiacIndex,
    isFormComplete,
    updateField,
    touchStep,
    submitSaju,
  } = useSajuInputForm({ steps, nextPath });

  return (
    <SajuInputFields
      formValues={formValues}
      stepStates={stepStates}
      highlightedZodiac={highlightedZodiac}
      highlightedZodiacIndex={highlightedZodiacIndex}
      onChangeField={updateField}
      onTouchStep={touchStep}
      isFormComplete={isFormComplete}
      onSubmitSaju={submitSaju}
    />
  );
}
