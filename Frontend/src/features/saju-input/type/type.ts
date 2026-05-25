import type { InputStepItem } from "@/features/saju-input/step/step";

export type SajuInputFieldsProps = {
  steps: InputStepItem[];
};

export type SajuFormValues = {
  birthYear: string;
  birthDate: string;
  city: string;
  calendarType: string;
  birthTime: string;
  gender: string;
  timeUnknown: string;
};

export type TouchedSteps = {
  birthDate: boolean;
  birthTime: boolean;
  gender: boolean;
};

export type HighlightedZodiac = {
  emoji: string;
  img: string;
  name: string;
  hanja: string;
};
