"use client";

import { useState } from "react";

import { useSajuHooks } from "@/features/saju-input/hooks/useSajuHooks";
import {
  defaultFormValues,
  defaultTouchedSteps,
} from "@/features/saju-input/model/constants";
import {
  getHighlightedZodiac,
  getHighlightedZodiacIndex,
  getStepCompletionState,
  getStepStates,
} from "@/features/saju-input/model/utils";
import type { InputStepItem } from "@/features/saju-input/step/step";
import type {
  SajuFormValues,
  TouchedSteps,
} from "@/features/saju-input/type/type";

type UseSajuInputFormParams = {
  steps: InputStepItem[];
};

export function useSajuInputForm({ steps }: UseSajuInputFormParams) {
  const [formValues, setFormValues] =
    useState<SajuFormValues>(defaultFormValues);
  const [touchedSteps, setTouchedSteps] =
    useState<TouchedSteps>(defaultTouchedSteps);
  const { handleSubmitSaju } = useSajuHooks();

  const highlightedZodiacIndex = getHighlightedZodiacIndex(
    formValues.birthYear,
    formValues.birthDate,
  );
  const highlightedZodiac = getHighlightedZodiac(highlightedZodiacIndex);
  const { isAllComplete } = getStepCompletionState(formValues);
  const stepStates = getStepStates(steps, touchedSteps, formValues);

  const updateField = <K extends keyof SajuFormValues>(
    field: K,
    value: SajuFormValues[K],
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const touchStep = (step: keyof TouchedSteps) => {
    setTouchedSteps((prev) => ({ ...prev, [step]: true }));
  };

  return {
    formValues,
    stepStates,
    highlightedZodiac,
    highlightedZodiacIndex,
    isFormComplete: isAllComplete,
    updateField,
    touchStep,
    submitSaju: () => handleSubmitSaju(formValues),
  };
}
