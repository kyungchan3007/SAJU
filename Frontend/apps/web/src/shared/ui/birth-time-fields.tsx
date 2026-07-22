"use client";

import type { SelectOption } from "@/shared/model/date-time-options/model";
import { Select } from "@/shared/ui";

type Props = {
  hourLabel?: string;
  minuteLabel?: string;
  unknownQuestionLabel?: string;
  unknownEnabledLabel?: string;
  unknownDisabledLabel?: string;
  birthHour: string;
  birthMinute: string;
  isTimeUnknown: boolean;
  hourOptions: SelectOption[];
  minuteOptions: SelectOption[];
  onChangeBirthTime: (part: "hour" | "minute", value: string) => void;
  onToggleTimeUnknown: () => void;
  onTouchBirthTime?: () => void;
};

export function BirthTimeFields({
  hourLabel = "출생 시간",
  minuteLabel = "출생 분",
  unknownQuestionLabel = "출생 시간을 모르시나요?",
  unknownEnabledLabel = "시간 미상 선택됨",
  unknownDisabledLabel = "시간 미상",
  birthHour,
  birthMinute,
  isTimeUnknown,
  hourOptions,
  minuteOptions,
  onChangeBirthTime,
  onToggleTimeUnknown,
  onTouchBirthTime,
}: Props) {
  return (
    <>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-gray-700">{hourLabel}</span>
        <div>
          <Select
            value={birthHour}
            onChange={(e) => onChangeBirthTime("hour", e.target.value)}
            onBlur={onTouchBirthTime}
            disabled={isTimeUnknown}
            name="birthHour"
            autoComplete="off"
            className="h-[50px] rounded-[14px] px-4 pr-9"
          >
            {hourOptions.map((option) => (
              <option key={option.value || "empty"} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-gray-700">{minuteLabel}</span>
        <div>
          <Select
            value={birthMinute}
            onChange={(e) => onChangeBirthTime("minute", e.target.value)}
            onBlur={onTouchBirthTime}
            disabled={isTimeUnknown}
            name="birthMinute"
            autoComplete="off"
            className="h-[50px] rounded-[14px] px-4 pr-9"
          >
            {minuteOptions.map((option) => (
              <option key={option.value || "empty"} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </label>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500">
          {unknownQuestionLabel}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={isTimeUnknown}
            aria-label="출생 시간 미상 여부"
            onClick={onToggleTimeUnknown}
            className="relative h-[22px] w-10 rounded-full border-none outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#5956E9] focus-visible:ring-offset-2"
            style={{ background: isTimeUnknown ? "#5956E9" : "#E5E7EB" }}
          >
            <span
              className="absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
              style={{
                left: "3px",
                transform: isTimeUnknown ? "translateX(18px)" : "translateX(0)",
              }}
            />
          </button>
          <span
            className="text-[11px] font-semibold"
            style={{ color: isTimeUnknown ? "#5956E9" : "#9CA3AF" }}
          >
            {isTimeUnknown ? unknownEnabledLabel : unknownDisabledLabel}
          </span>
        </div>
      </div>
    </>
  );
}
