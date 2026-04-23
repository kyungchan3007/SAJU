"use client";

import {
  defaultFormValues,
  defaultTouchedSteps,
} from "@/features/saju-input/model/constants";
import { useSajuHooks } from "@/features/saju-input/hooks/useSajuHooks";
import {
  getHighlightedZodiac,
  getHighlightedZodiacIndex,
  getStepStates,
} from "@/features/saju-input/model/utils";
import type { InputStepItem } from "@/features/saju-input/step/step";
import type {
  SajuFormValues,
  TouchedSteps,
} from "@/features/saju-input/type/type";
import { useState } from "react";

import { SajuInputFields } from "./saju-input-fields.client";

type SajuInputFieldsContainerProps = {
  steps: InputStepItem[];
};

export function SajuInputFieldsContainer({
  steps,
}: SajuInputFieldsContainerProps) {
  // saju-input-form.tsx 에서 호출된다.
  // 여기서 상태를 만들고, 아래 logic 함수들을 호출한 뒤 UI 컴포넌트로 넘긴다.
  const [formValues, setFormValues] =
    useState<SajuFormValues>(defaultFormValues);
  const [touchedSteps, setTouchedSteps] =
    useState<TouchedSteps>(defaultTouchedSteps);
  const { handleSubmitSaju } = useSajuHooks();

  // getHighlightedZodiacIndex, getHighlightedZodiac, getStepStates 는 utils.ts 에서 호출한다.
  // 모두 이 container 함수 안에서 호출된다.
  const highlightedZodiacIndex = getHighlightedZodiacIndex(
    formValues.birthYear,
    formValues.birthDate,
  );
  const highlightedZodiac = getHighlightedZodiac(highlightedZodiacIndex);
  const stepStates = getStepStates(steps, touchedSteps, formValues);

  // 이 함수는 아래 <SajuInputFields onChangeField={updateField} /> 로 내려가고,
  // saju-input-fields.client.tsx 에서 일어난다.
  const updateField = <K extends keyof SajuFormValues>(
    field: K,
    value: SajuFormValues[K],
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // 이 함수는 아래 <SajuInputFields onTouchStep={touchStep} /> 로 내려가고,
  // saju-input-fields.client.tsx 에서 일어난다.
  const touchStep = (step: keyof TouchedSteps) => {
    setTouchedSteps((prev) => ({ ...prev, [step]: true }));
  };

  // 이 render 결과로 UI 컴포넌트가 호출되고, UI는 받은 props만 사용해 그린다.
  return (
    <SajuInputFields
      formValues={formValues}
      stepStates={stepStates}
      highlightedZodiac={highlightedZodiac}
      highlightedZodiacIndex={highlightedZodiacIndex}
      onChangeField={updateField}
      onTouchStep={touchStep}
      onSubmitSaju={() => handleSubmitSaju(formValues)}
    />
  );
}
