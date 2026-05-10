import type {
  SajuFormValues,
  TouchedSteps,
} from "@/features/saju-input/type/type";
import { BIRTH_TIME_OPTIONS } from "@/shared/model/date-time-options/model";
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

export const birthTimeOptions = BIRTH_TIME_OPTIONS;

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
