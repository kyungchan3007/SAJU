import type {
  SajuFormValues,
  TouchedSteps,
} from "@/features/saju-input/type/type";
import {
  HOUR_OPTIONS,
  MINUTE_OPTIONS,
} from "@/shared/model/date-time-options/model";
import { CITY_OPTIONS } from "@/shared/model/city-options/model";
import { SAJU_CALENDAR_TYPE_OPTIONS } from "@/shared/model/saju-calendar/model";

export const defaultFormValues: SajuFormValues = {
  birthYear: "2005",
  birthDate: "",
  city: "",
  calendarType: "SOLAR",
  birthTime: "",
  gender: "",
  timeUnknown: "no",
  agreedToPrivacy: false,
};

export const defaultTouchedSteps: TouchedSteps = {
  birthDate: false,
  birthTime: false,
  gender: false,
};

export const birthYearOptions = Array.from(
  { length: 100 },
  (_, index) => 2005 - index,
);

export const cityOptions = CITY_OPTIONS;

export const birthHourOptions = [
  { value: "", label: "시간 선택" },
  ...HOUR_OPTIONS,
];

export const birthMinuteOptions = [
  { value: "", label: "분 선택" },
  ...MINUTE_OPTIONS,
];

export const calendarTypeOptions = SAJU_CALENDAR_TYPE_OPTIONS;

export const genderOptions = [
  { value: "", label: "성별 선택" },
  { value: "FEMALE", label: "여성" },
  { value: "MALE", label: "남성" },
] as const;

export const timeUnknownOptions = [
  { value: "no", label: "아니오" },
  { value: "yes", label: "예" },
] as const;
