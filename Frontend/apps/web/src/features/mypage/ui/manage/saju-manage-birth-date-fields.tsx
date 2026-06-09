"use client";

import { birthYearOptions } from "@/features/saju-input/model/constants";
import type { SajuManageFormState } from "@/features/mypage/model/sajuManageForm";
import { DAY_OPTIONS, MONTH_OPTIONS } from "@/shared/model/date-time-options/model";
import { Select } from "@/shared/ui";

type Props = {
  formState: SajuManageFormState;
  onChangeField: <K extends keyof SajuManageFormState>(
    field: K,
    value: SajuManageFormState[K],
  ) => void;
};

export function SajuManageBirthDateFields({
  formState,
  onChangeField,
}: Props) {
  const fields = [
    {
      id: "year",
      value: formState.birthYear,
      field: "birthYear" as const,
      options: birthYearOptions.map((year) => ({
        value: String(year),
        label: `${year}년`,
      })),
    },
    {
      id: "month",
      value: formState.birthMonth,
      field: "birthMonth" as const,
      options: MONTH_OPTIONS,
    },
    {
      id: "day",
      value: formState.birthDay,
      field: "birthDay" as const,
      options: DAY_OPTIONS,
    },
  ];

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] gap-2">
      {fields.map(({ id, value, field, options }) => (
        <div key={id}>
          <Select
            value={value}
            onChange={(event) => onChangeField(field, event.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
}
