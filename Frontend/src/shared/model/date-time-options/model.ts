export type SelectOption = {
  value: string;
  label: string;
};

export const HOUR_OPTIONS: SelectOption[] = Array.from(
  { length: 24 },
  (_, hour) => {
    const ampm = hour < 12 ? "오전" : "오후";
    const hourLabel =
      hour === 0 ? "0시 (자시)" : hour <= 12 ? `${hour}시` : `${hour - 12}시`;

    return {
      value: String(hour),
      label: `${ampm} ${hourLabel}`,
    };
  },
);

export const MINUTE_OPTIONS: SelectOption[] = Array.from(
  { length: 60 },
  (_, minute) => ({
    value: String(minute),
    label: `${String(minute).padStart(2, "0")}분`,
  }),
);

export const MONTH_OPTIONS: SelectOption[] = Array.from(
  { length: 12 },
  (_, monthIndex) => ({
    value: String(monthIndex + 1),
    label: `${monthIndex + 1}월`,
  }),
);

export const DAY_OPTIONS: SelectOption[] = Array.from(
  { length: 31 },
  (_, dayIndex) => ({
    value: String(dayIndex + 1),
    label: `${dayIndex + 1}일`,
  }),
);

export const BIRTH_TIME_OPTIONS = [
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
