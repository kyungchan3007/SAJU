"use client";

import type { Route } from "next";
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
} from "@/features/saju-input/model/utils";
import type {
  SajuFormValues,
  TouchedSteps,
} from "@/features/saju-input/type/type";

type UseSajuInputFormParams = {
  nextPath?: Route | null;
  isConsentAlreadyGiven?: boolean;
};

export function useSajuInputForm({
  nextPath,
  isConsentAlreadyGiven = false,
}: UseSajuInputFormParams) {
  const [formValues, setFormValues] =
    useState<SajuFormValues>(() => ({
      ...defaultFormValues,
      agreedToTerms: isConsentAlreadyGiven,
      agreedToPrivacy: isConsentAlreadyGiven,
    }));
  const [, setTouchedSteps] = useState<TouchedSteps>(defaultTouchedSteps);
  const { handleSubmitSaju } = useSajuHooks({ nextPath });
  const effectiveFormValues = isConsentAlreadyGiven
    ? {
        ...formValues,
        agreedToTerms: true,
        agreedToPrivacy: true,
      }
    : formValues;

  const highlightedZodiacIndex = getHighlightedZodiacIndex(
    effectiveFormValues.birthYear,
    effectiveFormValues.birthDate,
  );
  const highlightedZodiac = getHighlightedZodiac(highlightedZodiacIndex);
  const { isAllComplete } = getStepCompletionState(effectiveFormValues);
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
    formValues: effectiveFormValues,
    highlightedZodiac,
    highlightedZodiacIndex,
    isFormComplete: isAllComplete,
    updateField,
    touchStep,
    submitSaju: () => handleSubmitSaju(effectiveFormValues),
  };
}
