import type { InputStepItem } from "@/features/saju-input/step/step";
import type {
  SajuFormValues,
  TouchedSteps,
} from "@/features/saju-input/type/type";
import { ZODIAC_LIST } from "@/shared/model/zodiac/model";
import {
  isValidBirthMonthDay,
  parseBirthMonthDay,
} from "@/shared/utils/BirthDate";
import { parseTimeParts } from "@/shared/utils/Time";

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
    ? ZODIAC_LIST[highlightedZodiacIndex]
    : null;
}

// utils.ts 의
// getStepStates 내부에서만 호출된다.
export function getStepCompletionState(formValues: SajuFormValues) {
  const isBirthDateStepComplete =
    formValues.birthYear !== "" &&
    formValues.city !== "" &&
    formValues.calendarType !== "" &&
    isValidBirthMonthDay(formValues.birthDate.trim());
  const { hour, minute } = parseTimeParts(formValues.birthTime);
  const hasAnyBirthTimeSelection = hour !== "" || minute !== "";
  const isBirthTimeStepComplete =
    formValues.timeUnknown === "yes" ||
    !hasAnyBirthTimeSelection ||
    (hour !== "" && minute !== "");
  const isGenderStepComplete = formValues.gender !== "";
  const isPrivacyConsentComplete = formValues.agreedToPrivacy;

  return {
    isBirthDateStepComplete,
    isBirthTimeStepComplete,
    isGenderStepComplete,
    isPrivacyConsentComplete,
    isAllComplete:
      isBirthDateStepComplete &&
      isBirthTimeStepComplete &&
      isGenderStepComplete &&
      isPrivacyConsentComplete,
  };
}

export function getFirstIncompleteFieldMessage(formValues: SajuFormValues): {
  title: string;
  description: string;
} {
  if (formValues.birthYear.trim() === "") {
    return {
      title: "출생 연도를 선택해 주세요",
      description: "출생 연도 입력란을 먼저 채워 주세요.",
    };
  }

  const birthDate = formValues.birthDate.trim();
  if (birthDate === "") {
    return {
      title: "출생 월/일을 입력해 주세요",
      description: "출생 월/일 입력란을 채워 주세요. 예: 03 / 14",
    };
  }

  if (!isValidBirthMonthDay(birthDate)) {
    return {
      title: "출생 월/일 형식을 확인해 주세요",
      description: "예: 03 / 14 또는 3/14 형식으로 입력해 주세요.",
    };
  }

  if (formValues.city.trim() === "") {
    return {
      title: "출생 도시를 선택해 주세요",
      description: "사주 계산에 사용할 출생 지역을 선택해 주세요.",
    };
  }

  if (formValues.calendarType.trim() === "") {
    return {
      title: "양력/음력을 선택해 주세요",
      description: "출생 월/일 기준인 양력 또는 음력을 선택해 주세요.",
    };
  }

  const { hour, minute } = parseTimeParts(formValues.birthTime);
  if (
    formValues.timeUnknown !== "yes" &&
    ((hour !== "" && minute === "") || (hour === "" && minute !== ""))
  ) {
    return {
      title: "출생 시간을 끝까지 선택해 주세요",
      description: "시간을 선택했다면 분까지 함께 선택해 주세요.",
    };
  }

  if (formValues.gender.trim() === "") {
    return {
      title: "성별을 선택해 주세요",
      description: "성별 입력란을 선택하면 다음 단계로 진행됩니다.",
    };
  }

  if (!formValues.agreedToPrivacy) {
    return {
      title: "개인정보 수집·이용 동의를 확인해주세요.",
      description:
        "사주 분석에 필요한 개인정보 수집·이용 안내를 확인하고 동의해야 진행할 수 있습니다.",
    };
  }

  return {
    title: "입력 항목을 모두 확인해주세요.",
    description:
      "필수 입력과 개인정보 수집·이용 동의를 완료해야 진행할 수 있습니다.",
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
