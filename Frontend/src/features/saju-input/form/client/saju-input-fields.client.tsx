"use client";

import ZodiacList from "@/domain/saju/guid-card/12zodiac/12zodiac";
import {
  birthTimeOptions,
  birthYearOptions,
  calendarTypeOptions,
  genderOptions,
  timeUnknownOptions,
} from "@/features/saju-input/model/constants";
import InputStep, { type InputStepItem } from "@/features/saju-input/step/step";
import type {
  HighlightedZodiac,
  SajuFormValues,
  TouchedSteps,
} from "@/features/saju-input/type/type";

const fieldClassName =
  "w-full rounded-xl border border-[rgba(170,132,238,0.32)] bg-[rgba(13,9,26,0.62)] px-4 py-3.5 text-sm text-[rgba(248,241,255,0.95)] outline-none transition placeholder:text-[rgba(211,186,247,0.55)] focus:border-[rgba(239,200,255,0.9)] focus:ring-2 focus:ring-[rgba(182,120,255,0.28)]";

type SajuInputFieldsProps = {
  formValues: SajuFormValues;
  stepStates: InputStepItem[];
  highlightedZodiac: HighlightedZodiac | null;
  highlightedZodiacIndex: number | null;
  onChangeField: <K extends keyof SajuFormValues>(
    field: K,
    value: SajuFormValues[K],
  ) => void;
  onTouchStep: (step: keyof TouchedSteps) => void;
};

export function SajuInputFields({
  formValues,
  stepStates,
  highlightedZodiac,
  highlightedZodiacIndex,
  onChangeField,
  onTouchStep,
}: SajuInputFieldsProps) {
  return (
    <>
      {/* stepStates 는 sagu-input-fields.container.tsx 의 getStepStates 호출 결과다. */}
      <InputStep steps={stepStates} />

      <form className="mt-5">
        <div className="grid grid-cols-2 gap-3.5">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[rgba(167,181,227,0.9)]">
              출생 연도
            </span>
            <select
              value={formValues.birthYear}
              // 여기서 onChangeField("birthYear", ...) 를 호출하면
              // 실제 실행은 sagu-input-fields.container.tsx 의 updateField 에서 된다.
              onChange={(event) =>
                onChangeField("birthYear", event.target.value)
              }
              onBlur={() => onTouchStep("birthDate")}
              className={`${fieldClassName} cursor-pointer appearance-none`}
            >
              {birthYearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[rgba(167,181,227,0.9)]">
              출생 월 / 일
            </span>
            <input
              type="text"
              placeholder="03 / 14"
              value={formValues.birthDate}
              // 여기서 onChangeField("birthDate", ...) 를 호출하면
              // container가 다시 렌더되고 getHighlightedZodiacIndex / getStepStates 가 다시 호출된다.
              onChange={(event) =>
                onChangeField("birthDate", event.target.value)
              }
              onBlur={() => onTouchStep("birthDate")}
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[rgba(167,181,227,0.9)]">
              양력 / 음력
            </span>
            <select
              value={formValues.calendarType}
              onChange={(event) =>
                onChangeField("calendarType", event.target.value)
              }
              onBlur={() => onTouchStep("birthDate")}
              className={`${fieldClassName} cursor-pointer appearance-none`}
            >
              {calendarTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[rgba(167,181,227,0.9)]">
              출생 시간
            </span>
            <select
              value={formValues.birthTime}
              onChange={(event) =>
                onChangeField("birthTime", event.target.value)
              }
              onBlur={() => onTouchStep("birthTime")}
              disabled={formValues.timeUnknown === "yes"}
              className={`${fieldClassName} cursor-pointer appearance-none`}
            >
              {birthTimeOptions.map((option) => (
                <option key={option.value || "empty"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[rgba(167,181,227,0.9)]">
              성별
            </span>
            <select
              value={formValues.gender}
              onChange={(event) => onChangeField("gender", event.target.value)}
              onBlur={() => onTouchStep("gender")}
              className={`${fieldClassName} cursor-pointer appearance-none`}
            >
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[rgba(167,181,227,0.9)]">
              시간 미상 여부
            </span>
            <select
              value={formValues.timeUnknown}
              onChange={(event) =>
                onChangeField("timeUnknown", event.target.value)
              }
              onBlur={() => onTouchStep("birthTime")}
              className={`${fieldClassName} cursor-pointer appearance-none`}
            >
              {timeUnknownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* highlightedZodiac 는 sagu-input-fields.container.tsx 의
            getHighlightedZodiac 호출 결과다. */}
        <div
          className="mt-4 flex items-center gap-3.5 rounded-[20px] p-4"
          style={{
            border:
              highlightedZodiac !== null
                ? "1px solid rgba(255,214,130,0.5)"
                : "1px solid rgba(178,121,255,0.25)",
            background:
              highlightedZodiac !== null
                ? "linear-gradient(120deg, rgba(255,218,142,0.16), rgba(255,164,99,0.14))"
                : "rgba(178,121,255,0.08)",
          }}
        >
          <div
            className="grid h-[60px] w-[60px] shrink-0 place-items-center rounded-[18px] text-3xl"
            style={{
              background:
                highlightedZodiac !== null
                  ? "linear-gradient(145deg, rgba(255,236,176,0.96), rgba(255,174,96,0.88))"
                  : "linear-gradient(135deg, rgba(178,121,255,0.18), rgba(88,120,190,0.22))",
              boxShadow:
                highlightedZodiac !== null
                  ? "0 8px 22px rgba(255,176,94,0.45)"
                  : undefined,
            }}
          >
            {highlightedZodiac?.emoji ?? "✨"}
          </div>
          <div>
            <strong className="text-sm font-bold text-[rgba(252,247,255,0.96)]">
              {highlightedZodiac !== null
                ? `${formValues.birthYear}년생 · ${highlightedZodiac.name}띠`
                : "출생일을 입력하면 띠가 자동 선택됩니다"}
            </strong>
            <p className="mt-1 text-xs text-[rgba(228,205,255,0.72)]">
              {highlightedZodiac !== null
                ? "12간지 카드에서 자동으로 강조 표시됩니다."
                : "예: 03 / 14 형식으로 입력해보세요."}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button type="button" className="btn-saju btn-saju-secondary">
            이전
          </button>
          <button type="submit" className="btn-saju btn-saju-primary flex-1">
            오늘의 기운 보기
          </button>
        </div>
      </form>

      {/* highlightedZodiacIndex 는 sagu-input-fields.container.tsx 의
          getHighlightedZodiacIndex 호출 결과다. */}
      <ZodiacList highlightedIndex={highlightedZodiacIndex} />
    </>
  );
}
