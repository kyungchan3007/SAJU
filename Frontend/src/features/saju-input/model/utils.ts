import { zodiacList } from "@/domain/saju/guid-card/12zodiac/model/model";
import type { InputStepItem } from "@/features/saju-input/step/step";
import type {
  SajuFormValues,
  TouchedSteps,
} from "@/features/saju-input/type/type";

// utils.ts 의
// isValidBirthMonthDay, getHighlightedZodiacIndex 내부에서 호출된다.
function parseBirthMonthDay(value: string) {
  const compact = value.replace(/\s/g, "");
  const match = compact.match(/^(\d{1,2})[\/.-]?(\d{1,2})$/);
  if (!match) {
    return null;
  }

  const month = Number(match[1]);
  const day = Number(match[2]);
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  return { month, day };
}

export function isValidBirthMonthDay(value: string) {
  return parseBirthMonthDay(value) !== null;
}

// saju-input-fields.container.tsx 의
// SajuInputFieldsContainer 안에서 직접 호출된다.
export function getHighlightedZodiacIndex(
  birthYear: string,
  birthDate: string,
) {
  const year = Number(birthYear);
  const monthDay = parseBirthMonthDay(birthDate);

  if (!Number.isInteger(year) || !monthDay) {
    return null;
  }

  // 입춘(2/4) 이전 출생자는 전년도 띠 기준으로 본다.
  const zodiacYear =
    monthDay.month < 2 || (monthDay.month === 2 && monthDay.day < 4)
      ? year - 1
      : year;

  return (((zodiacYear - 2008) % 12) + 12) % 12;
}

// saju-input-fields.container.tsx 의
// SajuInputFieldsContainer 안에서 getHighlightedZodiacIndex 바로 아래에서 호출된다.
export function getHighlightedZodiac(highlightedZodiacIndex: number | null) {
  return highlightedZodiacIndex !== null
    ? zodiacList[highlightedZodiacIndex]
    : null;
}

//utils.ts 의
// getStepStates 내부에서만 호출된다.
export function getStepCompletionState(formValues: SajuFormValues) {
  const isBirthDateStepComplete =
    formValues.birthYear !== "" &&
    formValues.calendarType !== "" &&
    isValidBirthMonthDay(formValues.birthDate.trim());
  const isBirthTimeStepComplete =
    formValues.timeUnknown === "yes" ||
    (formValues.timeUnknown === "no" && formValues.birthTime !== "");
  const isGenderStepComplete = formValues.gender !== "";

  return {
    isBirthDateStepComplete,
    isBirthTimeStepComplete,
    isGenderStepComplete,
    isAllComplete:
      isBirthDateStepComplete &&
      isBirthTimeStepComplete &&
      isGenderStepComplete,
  };
}

// saju-input-fields.container.tsx 의
// SajuInputFieldsContainer 안에서 직접 호출되고,
// saju-input-fields.client.tsx 의
// <InputStep steps={stepStates} /> 로 내려간다.
export function getStepStates(
  steps: InputStepItem[],
  touchedSteps: TouchedSteps,
  formValues: SajuFormValues,
) {
  const {
    isBirthDateStepComplete,
    isBirthTimeStepComplete,
    isGenderStepComplete,
    isAllComplete,
  } = getStepCompletionState(formValues);

  // step 활성화 규칙은 렌더링과 분리해서 여기서만 관리한다.
  return steps.map((step, index) => {
    if (index === 0) {
      return {
        ...step,
        active: touchedSteps.birthDate && isBirthDateStepComplete,
      };
    }

    if (index === 1) {
      return {
        ...step,
        active: touchedSteps.birthTime && isBirthTimeStepComplete,
      };
    }

    if (index === 2) {
      return { ...step, active: touchedSteps.gender && isGenderStepComplete };
    }

    return {
      ...step,
      active: isAllComplete,
    };
  });
}
