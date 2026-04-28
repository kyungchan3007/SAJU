"use client";

import * as Toast from "@radix-ui/react-toast";
import ZodiacList from "@/domain/saju/guid-card/12zodiac/12zodiac";
import { useSajuValidationToast } from "@/features/saju-input/hooks/useSajuValidationToast";
import { OpenmojiImg } from "@/shared/ui/openmoji-img";
import {
  cityOptions,
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
  "sketch-input w-full cursor-pointer appearance-none py-3.5";

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
  stepStates,
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

  return (
    <Toast.Provider swipeDirection="right" duration={2200}>
      {/* stepStates 는 sagu-input-fields.container.tsx 의 getStepStates 호출 결과다. */}
      <InputStep steps={stepStates} />

      <form
        className="mt-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (!isFormComplete) {
            showValidationToast();
            return;
          }
          onSubmitSaju();
        }}
      >
        <div className="grid grid-cols-2 gap-3.5">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-black/60">출생 연도</span>
            <select
              value={formValues.birthYear}
              // 여기서 onChangeField("birthYear", ...) 를 호출하면
              // 실제 실행은 sagu-input-fields.container.tsx 의 updateField 에서 된다.
              onChange={(event) =>
                onChangeField("birthYear", event.target.value)
              }
              onBlur={() => onTouchStep("birthDate")}
              className={fieldClassName}
            >
              {birthYearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-black/60">
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
            <span className="text-xs font-bold text-black/60">양력 / 음력</span>
            <select
              value={formValues.calendarType}
              onChange={(event) =>
                onChangeField("calendarType", event.target.value)
              }
              onBlur={() => onTouchStep("birthDate")}
              className={fieldClassName}
            >
              {calendarTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-black/60">출생 도시</span>
            <select
              value={formValues.city}
              onChange={(event) => onChangeField("city", event.target.value)}
              onBlur={() => onTouchStep("birthDate")}
              className={fieldClassName}
            >
              {cityOptions.map((option) => (
                <option key={option.value || "empty"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-black/60">출생 시간</span>
            <select
              value={formValues.birthTime}
              onChange={(event) =>
                onChangeField("birthTime", event.target.value)
              }
              onBlur={() => onTouchStep("birthTime")}
              disabled={formValues.timeUnknown === "yes"}
              className={fieldClassName}
            >
              {birthTimeOptions.map((option) => (
                <option key={option.value || "empty"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-black/60">성별</span>
            <select
              value={formValues.gender}
              onChange={(event) => onChangeField("gender", event.target.value)}
              onBlur={() => onTouchStep("gender")}
              className={fieldClassName}
            >
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                  {option.value}
                </option>
              ))}
            </select>
          </label>

          {/*<label className="flex flex-col gap-2">*/}
          {/*  <span className="text-xs font-bold text-black/60">*/}
          {/*    시간 미상 여부*/}
          {/*  </span>*/}
          {/*  <select*/}
          {/*    value={formValues.timeUnknown}*/}
          {/*    onChange={(event) =>*/}
          {/*      onChangeField("timeUnknown", event.target.value)*/}
          {/*    }*/}
          {/*    onBlur={() => onTouchStep("birthTime")}*/}
          {/*    className={fieldClassName}*/}
          {/*  >*/}
          {/*    {timeUnknownOptions.map((option) => (*/}
          {/*      <option key={option.value} value={option.value}>*/}
          {/*        {option.label}*/}
          {/*      </option>*/}
          {/*    ))}*/}
          {/*  </select>*/}
          {/*</label>*/}
        </div>

        {/* highlightedZodiac 는 sagu-input-fields.container.tsx 의
            getHighlightedZodiac 호출 결과다. */}
        <div className="sketch-border mt-4 flex items-center gap-3.5 p-4">
          <div
            className="grid h-[60px] w-[60px] shrink-0 place-items-center rounded-sm border-2 border-black"
            style={{ boxShadow: "2px 2px 0 #000" }}
          >
            <OpenmojiImg
              emoji={highlightedZodiac?.emoji ?? "🌙"}
              size={36}
              alt={highlightedZodiac?.name ?? "수정구슬"}
            />
          </div>
          <div>
            <strong className="text-sm font-bold text-black">
              {highlightedZodiac !== null
                ? `${formValues.birthYear}년생 · ${highlightedZodiac.name}띠`
                : "출생일을 입력하면 띠가 자동 선택됩니다"}
            </strong>
            <p className="mt-1 text-xs text-black/50">
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

      <ZodiacList highlightedIndex={highlightedZodiacIndex} />
      <Toast.Root
        open={isValidationToastOpen}
        onOpenChange={setValidationToastOpen}
        className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-[28rem] -translate-x-1/2 rounded-sm border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000]"
      >
        <Toast.Title className="text-sm font-bold text-black">
          {validationToastMessage.title}
        </Toast.Title>
        <Toast.Description className="mt-1 text-xs text-black/65">
          {validationToastMessage.description}
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="pointer-events-none fixed inset-0 z-50" />
    </Toast.Provider>
  );
}
