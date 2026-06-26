"use client";

import Image from "next/image";
import * as Toast from "@radix-ui/react-toast";

import ZodiacList from "@/domain/saju/guid-card/12zodiac/12zodiac";
import { SajuInputConsentSection } from "@/features/saju-input/form/client/saju-input-consent-section";
import type { SajuSubmitStatus } from "@/features/saju-input/hooks/useSajuHooks";
import { useSajuValidationToast } from "@/features/saju-input/hooks/useSajuValidationToast";
import {
  birthHourOptions,
  birthMinuteOptions,
  birthYearOptions,
  calendarTypeOptions,
  cityOptions,
  genderOptions,
} from "@/features/saju-input/model/constants";
import type {
  HighlightedZodiac,
  SajuFormValues,
  TouchedSteps,
} from "@/features/saju-input/type/type";
import { BirthTimeFields, Button, Input, Select } from "@/shared/ui";
import { parseTimeParts, updateTimeStringPart } from "@/shared/utils/Time";

type SajuInputFieldsProps = {
  formValues: SajuFormValues;
  highlightedZodiac: HighlightedZodiac | null;
  highlightedZodiacIndex: number | null;
  onChangeField: <K extends keyof SajuFormValues>(
    field: K,
    value: SajuFormValues[K],
  ) => void;
  onTouchStep: (step: keyof TouchedSteps) => void;
  showConsentSection: boolean;
  isFormComplete: boolean;
  submitStatus: SajuSubmitStatus;
  onSubmitSaju: () => void;
};

export function SajuInputFields({
  formValues,
  highlightedZodiac,
  highlightedZodiacIndex,
  onChangeField,
  onTouchStep,
  showConsentSection,
  isFormComplete,
  submitStatus,
  onSubmitSaju,
}: SajuInputFieldsProps) {
  const {
    isValidationToastOpen,
    setValidationToastOpen,
    validationToastMessage,
    showValidationToast,
  } = useSajuValidationToast(formValues);
  const isTimeUnknown = formValues.timeUnknown === "yes";
  const isSubmitting = submitStatus === "submitting";
  const isSubmitComplete = submitStatus === "complete";
  const { hour: birthHour, minute: birthMinute } = parseTimeParts(
    formValues.birthTime,
  );

  const handleChangeBirthTime = (part: "hour" | "minute", value: string) => {
    onChangeField(
      "birthTime",
      updateTimeStringPart(formValues.birthTime, part, value),
    );
  };

  const handleToggleTimeUnknown = () => {
    const nextTimeUnknown = isTimeUnknown ? "no" : "yes";
    onChangeField("timeUnknown", nextTimeUnknown);

    if (nextTimeUnknown === "yes") {
      onChangeField("birthTime", "");
    }
  };

  return (
    <Toast.Provider swipeDirection="right" duration={2200}>
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
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-700">
              출생 연도 <span style={{ color: "#5956E9" }}>*</span>
            </span>
            <div>
              <Select
                value={formValues.birthYear}
                onChange={(e) => onChangeField("birthYear", e.target.value)}
                onBlur={() => onTouchStep("birthDate")}
                name="birthYear"
                autoComplete="off"
                className="h-[50px] rounded-[14px] px-4 pr-9"
              >
                {birthYearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-700">
              출생 월 / 일 <span style={{ color: "#5956E9" }}>*</span>
            </span>
            <Input
              type="text"
              name="birthDate"
              autoComplete="off"
              placeholder="예: 03 / 14…"
              value={formValues.birthDate}
              onChange={(e) => onChangeField("birthDate", e.target.value)}
              onBlur={() => onTouchStep("birthDate")}
              className="h-[50px] rounded-[14px] px-4"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-700">
              양력 / 음력 <span style={{ color: "#5956E9" }}>*</span>
            </span>
            <div>
              <Select
                value={formValues.calendarType}
                onChange={(e) => onChangeField("calendarType", e.target.value)}
                onBlur={() => onTouchStep("birthDate")}
                name="calendarType"
                autoComplete="off"
                className="h-[50px] rounded-[14px] px-4 pr-9"
              >
                {calendarTypeOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-700">
              성별 <span style={{ color: "#5956E9" }}>*</span>
            </span>
            <div>
              <Select
                value={formValues.gender}
                onChange={(e) => onChangeField("gender", e.target.value)}
                onBlur={() => onTouchStep("gender")}
                name="gender"
                autoComplete="off"
                className="h-[50px] rounded-[14px] px-4 pr-9"
              >
                {genderOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </div>
          </label>

          <BirthTimeFields
            birthHour={birthHour}
            birthMinute={birthMinute}
            isTimeUnknown={isTimeUnknown}
            hourOptions={birthHourOptions}
            minuteOptions={birthMinuteOptions}
            onChangeBirthTime={handleChangeBirthTime}
            onTouchBirthTime={() => onTouchStep("birthTime")}
            onToggleTimeUnknown={handleToggleTimeUnknown}
          />

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-gray-700">출생 도시</span>
            <div>
              <Select
                value={formValues.city}
                onChange={(e) => onChangeField("city", e.target.value)}
                onBlur={() => onTouchStep("birthDate")}
                name="city"
                autoComplete="off"
                className="h-[50px] rounded-[14px] px-4 pr-9"
              >
                {cityOptions.map((o) => (
                  <option key={o.value || "empty"} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </div>
          </label>
        </div>

        <div
          className="mt-5 flex items-center gap-3.5 rounded-2xl px-4 py-4"
          style={{ background: "#FAFAFA" }}
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
          <div className="min-w-0 flex-1">
            <p
              className="text-sm font-black text-gray-900 xs:text-xs"
              style={{ wordBreak: "keep-all" }}
            >
              {highlightedZodiac ? (
                `${formValues.birthYear}년생 · ${highlightedZodiac.name}띠`
              ) : (
                <span>
                  출생 연도를 선택하면 <br className="sm:hidden" />
                  띠가 자동으로 표시됩니다
                </span>
              )}
            </p>
            <p
              className="mt-1 text-[11px] text-gray-400"
              style={{ wordBreak: "keep-all" }}
            >
              {highlightedZodiac
                ? "12간지에서 자동으로 강조 표시됩니다."
                : "예: 2000년 → 용띠"}
            </p>
          </div>
        </div>

        <ZodiacList highlightedIndex={highlightedZodiacIndex} />

        {showConsentSection ? (
          <SajuInputConsentSection
            agreedToTerms={formValues.agreedToTerms}
            agreedToPrivacy={formValues.agreedToPrivacy}
            onChangeAgreedToTerms={(checked) =>
              onChangeField("agreedToTerms", checked)
            }
            onChangeAgreedToPrivacy={(checked) =>
              onChangeField("agreedToPrivacy", checked)
            }
          />
        ) : null}

        <Button
          type="submit"
          className="mt-5 h-[54px] w-full rounded-2xl text-base font-black"
          disabled={isSubmitting || isSubmitComplete}
        >
          <SajuSubmitButtonContent submitStatus={submitStatus} />
        </Button>
        <p className="mt-2.5 text-center text-[11px] text-gray-400">
          🔒 입력된 정보는 사주 분석 목적으로만 사용됩니다.
        </p>
      </form>

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

function SajuSubmitButtonContent({
  submitStatus,
}: {
  submitStatus: SajuSubmitStatus;
}) {
  if (submitStatus === "submitting") {
    return (
      <>
        <span
          className="size-4 animate-spin rounded-full border-2 border-white/45 border-t-white"
          aria-hidden="true"
        />
        분석을 준비하고 있어요…
      </>
    );
  }

  if (submitStatus === "complete") {
    return <>완료되었어요!</>;
  }

  return <>✨ 사주 분석 시작하기</>;
}
