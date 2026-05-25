"use client";

import Image from "next/image";
import * as Toast from "@radix-ui/react-toast";
import ZodiacList from "@/domain/saju/guid-card/12zodiac/12zodiac";
import { useSajuValidationToast } from "@/features/saju-input/hooks/useSajuValidationToast";
import {
  cityOptions,
  birthTimeOptions,
  birthYearOptions,
  calendarTypeOptions,
  genderOptions,
} from "@/features/saju-input/model/constants";
import type { InputStepItem } from "@/features/saju-input/step/step";
import type {
  HighlightedZodiac,
  SajuFormValues,
  TouchedSteps,
} from "@/features/saju-input/type/type";

/** 공통 input / select 스타일 */
const fieldCls =
  "h-[50px] w-full appearance-none rounded-[14px] border border-[#E5E7EB] bg-white px-4 text-[13px] text-gray-900 outline-none transition-all cursor-pointer " +
  "focus:border-[#5956E9] focus:shadow-[0_0_0_3px_rgba(89,86,233,0.10)]";

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
  isFormComplete: boolean;
  onSubmitSaju: () => void;
};

export function SajuInputFields({
  formValues,
  highlightedZodiac,
  highlightedZodiacIndex,
  onChangeField,
  onTouchStep,
  isFormComplete,
  onSubmitSaju,
}: SajuInputFieldsProps) {
  const {
    isValidationToastOpen,
    setValidationToastOpen,
    validationToastMessage,
    showValidationToast,
  } = useSajuValidationToast(formValues);

  const isTimeUnknown = formValues.timeUnknown === "yes";

  return (
    <Toast.Provider swipeDirection="right" duration={2200}>
      {/* ── 입력 폼 그리드 ── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isFormComplete) {
            showValidationToast();
            return;
          }
          onSubmitSaju();
        }}
      >
        <div className="grid grid-cols-2 gap-[18px]">
          {/* 출생 연도 */}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-700">
              출생 연도 <span style={{ color: "#5956E9" }}>*</span>
            </span>
            <div className="relative">
              <select
                value={formValues.birthYear}
                onChange={(e) => onChangeField("birthYear", e.target.value)}
                onBlur={() => onTouchStep("birthDate")}
                name="birthYear"
                autoComplete="off"
                className={fieldCls}
                style={{ paddingRight: "36px" }}
              >
                {birthYearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                ▾
              </span>
            </div>
          </label>

          {/* 출생 월/일 */}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-700">
              출생 월 / 일 <span style={{ color: "#5956E9" }}>*</span>
            </span>
            <input
              type="text"
              name="birthDate"
              autoComplete="off"
              placeholder="예: 03 / 14…"
              value={formValues.birthDate}
              onChange={(e) => onChangeField("birthDate", e.target.value)}
              onBlur={() => onTouchStep("birthDate")}
              className={fieldCls}
            />
          </label>

          {/* 양력/음력 */}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-700">
              양력 / 음력 <span style={{ color: "#5956E9" }}>*</span>
            </span>
            <div className="relative">
              <select
                value={formValues.calendarType}
                onChange={(e) => onChangeField("calendarType", e.target.value)}
                onBlur={() => onTouchStep("birthDate")}
                name="calendarType"
                autoComplete="off"
                className={fieldCls}
                style={{ paddingRight: "36px" }}
              >
                {calendarTypeOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                ▾
              </span>
            </div>
          </label>

          {/* 성별 */}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-700">
              성별 <span style={{ color: "#5956E9" }}>*</span>
            </span>
            <div className="relative">
              <select
                value={formValues.gender}
                onChange={(e) => onChangeField("gender", e.target.value)}
                onBlur={() => onTouchStep("gender")}
                name="gender"
                autoComplete="off"
                className={fieldCls}
                style={{ paddingRight: "36px" }}
              >
                {genderOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                ▾
              </span>
            </div>
          </label>

          {/* 출생 시간 */}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-700">출생 시간</span>
            <div className="relative">
              <select
                value={formValues.birthTime}
                onChange={(e) => onChangeField("birthTime", e.target.value)}
                onBlur={() => onTouchStep("birthTime")}
                disabled={isTimeUnknown}
                name="birthTime"
                autoComplete="off"
                className={fieldCls}
                style={{
                  paddingRight: "36px",
                  opacity: isTimeUnknown ? 0.4 : 1,
                }}
              >
                {birthTimeOptions.map((o) => (
                  <option key={o.value || "empty"} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                ▾
              </span>
            </div>
          </label>

          {/* 출생 도시 */}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-700">출생 도시</span>
            <div className="relative">
              <select
                value={formValues.city}
                onChange={(e) => onChangeField("city", e.target.value)}
                onBlur={() => onTouchStep("birthDate")}
                name="city"
                autoComplete="off"
                className={fieldCls}
                style={{ paddingRight: "36px" }}
              >
                {cityOptions.map((o) => (
                  <option key={o.value || "empty"} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                ▾
              </span>
            </div>
          </label>
        </div>

        {/* ── 시간 미상 토글 ── */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500">
            출생 시간을 모르시나요?
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              role="switch"
              aria-checked={isTimeUnknown}
              aria-label="출생 시간 미상 여부"
              onClick={() =>
                onChangeField("timeUnknown", isTimeUnknown ? "no" : "yes")
              }
              className="relative h-[22px] w-10 rounded-full border-none outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#5956E9] focus-visible:ring-offset-2"
              style={{ background: isTimeUnknown ? "#5956E9" : "#E5E7EB" }}
            >
              <span
                className="absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition-all duration-200"
                style={{ left: isTimeUnknown ? "21px" : "3px" }}
              />
            </button>
            <span
              className="text-[11px] font-semibold"
              style={{ color: isTimeUnknown ? "#5956E9" : "#9CA3AF" }}
            >
              {isTimeUnknown ? "시간 미상 선택됨" : "시간 미상"}
            </span>
          </div>
        </div>

        {/* ── 띠 미리보기 ── */}
        <div
          className="mt-5 flex items-center gap-3.5 rounded-2xl px-4 py-4"
          style={{ background: "#F4F2FC" }}
        >
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-white"
            style={{ border: "1.5px solid #DDD8FF" }}
          >
            {highlightedZodiac ? (
              <Image
                src={`/image/animals/${highlightedZodiac.img}`}
                alt={highlightedZodiac.name}
                width={36}
                height={36}
                className="object-contain"
              />
            ) : (
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="#C7D2FE"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            )}
          </div>
          <div>
            <p className="text-sm font-black text-gray-900">
              {highlightedZodiac
                ? `${formValues.birthYear}년생 · ${highlightedZodiac.name}띠`
                : "출생 연도를 선택하면 띠가 자동으로 표시됩니다"}
            </p>
            <p className="mt-1 text-[11px] text-gray-400">
              {highlightedZodiac
                ? "12간지에서 자동으로 강조 표시됩니다."
                : "예: 2000년 → 용띠"}
            </p>
          </div>
        </div>

        {/* ── 12간지 미니 그리드 ── */}
        <ZodiacList highlightedIndex={highlightedZodiacIndex} />

        {/* ── 제출 버튼 ── */}
        <button
          type="submit"
          className="mt-5 w-full rounded-2xl border-none text-base font-black text-white transition-opacity hover:opacity-90"
          style={{
            height: "54px",
            background: "linear-gradient(to right, #5956E9, #7C3AED)",
            boxShadow: "0 4px 20px rgba(89,86,233,0.32)",
          }}
        >
          ✨ 사주 분석 시작하기
        </button>
        <p className="mt-2.5 text-center text-[11px] text-gray-400">
          🔒 입력된 정보는 사주 분석 목적으로만 사용됩니다.
        </p>
      </form>

      {/* ── Toast ── */}
      <Toast.Root
        open={isValidationToastOpen}
        onOpenChange={setValidationToastOpen}
        className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-[28rem] -translate-x-1/2 rounded-2xl bg-white px-5 py-4"
        style={{
          border: "1.5px solid #EDE9FF",
          boxShadow: "0 8px 24px rgba(89,86,233,0.15)",
        }}
      >
        <Toast.Title className="text-sm font-bold text-gray-900">
          {validationToastMessage.title}
        </Toast.Title>
        <Toast.Description className="mt-1 text-xs text-gray-500">
          {validationToastMessage.description}
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="pointer-events-none fixed inset-0 z-50" />
    </Toast.Provider>
  );
}
