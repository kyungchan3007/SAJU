import type { SajuFormValues, TouchedSteps } from "@/features/saju-input/type/type";

export const defaultFormValues: SajuFormValues = {
  birthYear: "2005",
  birthDate: "",
  calendarType: "solar",
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

export const birthTimeOptions = [
  { value: "", label: "시간 선택" },
  { value: "00:00", label: "오전 00:00 (자시)" },
  { value: "01:00", label: "오전 01:00" },
  { value: "02:00", label: "오전 02:00" },
  { value: "03:00", label: "오전 03:00" },
  { value: "04:00", label: "오전 04:00" },
  { value: "05:00", label: "오전 05:00" },
  { value: "06:00", label: "오전 06:00" },
  { value: "07:00", label: "오전 07:00" },
  { value: "08:00", label: "오전 08:00" },
  { value: "09:00", label: "오전 09:00" },
  { value: "09:30", label: "오전 09:30" },
  { value: "10:00", label: "오전 10:00" },
  { value: "11:00", label: "오전 11:00" },
  { value: "12:00", label: "오후 12:00" },
  { value: "13:00", label: "오후 01:00" },
  { value: "14:00", label: "오후 02:00" },
  { value: "15:00", label: "오후 03:00" },
  { value: "16:00", label: "오후 04:00" },
  { value: "17:00", label: "오후 05:00" },
  { value: "18:00", label: "오후 06:00" },
  { value: "19:00", label: "오후 07:00" },
  { value: "20:00", label: "오후 08:00" },
  { value: "21:00", label: "오후 09:00" },
  { value: "22:00", label: "오후 10:00" },
  { value: "23:00", label: "오후 11:00" },
];

export const calendarTypeOptions = [
  { value: "solar", label: "양력" },
  { value: "lunar", label: "음력" },
  { value: "lunar-leap", label: "음력 (윤달)" },
] as const;

export const genderOptions = [
  { value: "", label: "성별 선택" },
  { value: "female", label: "여성" },
  { value: "male", label: "남성" },
] as const;

export const timeUnknownOptions = [
  { value: "no", label: "아니오" },
  { value: "yes", label: "예" },
] as const;
