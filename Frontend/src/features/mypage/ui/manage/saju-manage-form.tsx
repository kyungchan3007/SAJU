"use client";

import {
  birthYearOptions,
  calendarTypeOptions,
  genderOptions,
} from "@/features/saju-input/model/constants";
import { useSajuManageForm } from "@/features/mypage/hooks/useSajuManageForm";
import type { SajuManageFormValues } from "@/features/mypage/model/sajuManage";
import type { SajuRequest } from "@/generated/api";
import { CITY_OPTIONS } from "@/shared/model/city-options/model";
import {
  DAY_OPTIONS,
  HOUR_OPTIONS,
  MINUTE_OPTIONS,
  MONTH_OPTIONS,
} from "@/shared/model/date-time-options/model";

type Props = {
  initialValues: SajuManageFormValues;
  isPending: boolean;
  errorMessage: string | null;
  onSave: (payload: SajuRequest) => void;
};

export function SajuManageForm({
  initialValues,
  isPending,
  errorMessage,
  onSave,
}: Props) {
  const { formState, isSubmittable, updateField, toggleTimeUnknown, submit } =
    useSajuManageForm({ initialValues, onSave });

  return (
    <div
      className="rounded-sm border-2 border-black bg-[#FDFCF8]"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <div className="border-b-2 border-black bg-[#F0EDE6] px-5 py-3 font-['Jua',sans-serif] text-[15px]">
        사주 정보
      </div>
      <div className="p-5">
        <div className="flex flex-col gap-5">
          {/* 양력/음력 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold tracking-wider text-[#7a7570]">
              양력 / 음력 <span className="text-red-500">*</span>
            </label>
            <div
              className="flex overflow-hidden rounded-sm border-2 border-black"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              {calendarTypeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateField("calendarType", opt.value)}
                  className={`flex-1 border-r-2 border-black py-2.5 text-[13px] font-bold last:border-r-0 ${
                    formState.calendarType === opt.value
                      ? "bg-[#0d0d0d] text-white"
                      : "bg-[#FDFCF8] text-[#0d0d0d]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 생년월일 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold tracking-wider text-[#7a7570]">
              생년월일 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-2">
              {[
                {
                  id: "year",
                  val: formState.birthYear,
                  field: "birthYear" as const,
                  opts: birthYearOptions.map((y) => ({
                    value: String(y),
                    label: `${y}년`,
                  })),
                },
                {
                  id: "month",
                  val: formState.birthMonth,
                  field: "birthMonth" as const,
                  opts: MONTH_OPTIONS,
                },
                {
                  id: "day",
                  val: formState.birthDay,
                  field: "birthDay" as const,
                  opts: DAY_OPTIONS,
                },
              ].map(({ id, val, field, opts }) => (
                <div key={id} className="relative">
                  <select
                    value={val}
                    onChange={(e) => updateField(field, e.target.value)}
                    className="w-full appearance-none rounded-sm border-2 border-black bg-[#FDFCF8] px-3 py-2.5 pr-7 text-[14px] font-semibold outline-none"
                    style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
                  >
                    {opts.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] text-[#7a7570]">
                    ▾
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 태어난 시간 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold tracking-wider text-[#7a7570]">
              태어난 시간
            </label>
            <div
              className="grid grid-cols-2 gap-2"
              style={{
                opacity: formState.timeUnknown ? 0.35 : 1,
                pointerEvents: formState.timeUnknown ? "none" : "auto",
              }}
            >
              {[
                {
                  id: "hour",
                  val: formState.hour,
                  field: "hour" as const,
                  opts: HOUR_OPTIONS,
                },
                {
                  id: "minute",
                  val: formState.minute,
                  field: "minute" as const,
                  opts: MINUTE_OPTIONS,
                },
              ].map(({ id, val, field, opts }) => (
                <div key={id} className="relative">
                  <select
                    value={val}
                    onChange={(e) => updateField(field, e.target.value)}
                    className="w-full appearance-none rounded-sm border-2 border-black bg-[#FDFCF8] px-3 py-2.5 pr-7 text-[14px] font-semibold outline-none"
                    style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
                  >
                    {opts.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] text-[#7a7570]">
                    ▾
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={toggleTimeUnknown}
              className="mt-1 flex items-center gap-2 text-left"
            >
              <span
                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm border-2 border-black text-[11px] font-black text-white"
                style={{
                  background: formState.timeUnknown ? "#0d0d0d" : "#FDFCF8",
                  boxShadow: "2px 2px 0 #0d0d0d",
                }}
              >
                {formState.timeUnknown ? "✓" : ""}
              </span>
              <span className="text-[13px] font-semibold text-[#7a7570]">
                태어난 시간을 모릅니다
              </span>
            </button>
          </div>

          {/* 성별 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold tracking-wider text-[#7a7570]">
              성별 <span className="text-red-500">*</span>
            </label>
            <div
              className="flex overflow-hidden rounded-sm border-2 border-black"
              style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
            >
              {genderOptions
                .filter((o) => o.value !== "")
                .map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateField("gender", opt.value)}
                    className={`flex-1 border-r-2 border-black py-2.5 text-[13px] font-bold last:border-r-0 ${
                      formState.gender === opt.value
                        ? "bg-[#0d0d0d] text-white"
                        : "bg-[#FDFCF8] text-[#0d0d0d]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
            </div>
          </div>

          {/* 태어난 도시 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold tracking-wider text-[#7a7570]">
              태어난 도시
            </label>
            <div className="relative">
              <select
                value={formState.city}
                onChange={(e) => updateField("city", e.target.value)}
                className="w-full appearance-none rounded-sm border-2 border-black bg-[#FDFCF8] px-3 py-2.5 pr-7 text-[14px] font-semibold outline-none"
                style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
              >
                {CITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] text-[#7a7570]">
                ▾
              </span>
            </div>
            <p className="text-[11px] text-[#7a7570]">
              출생 도시는 사주의 지역 보정값 계산에 사용됩니다.
            </p>
          </div>

          {/* 구분선 */}
          <div className="h-px bg-[#d4d0c8]" />

          {/* 경고 */}
          <p className="rounded-sm border-[1.5px] border-[#d97706] bg-[#fffbeb] px-3 py-2.5 text-[11px] leading-relaxed text-[#92400e]">
            수정하기를 누르면 기존 사주 분석은 사라지고, 새로 저장된 사주 정보로
            운세를 확인합니다.
          </p>

          {/* 에러 */}
          {errorMessage && (
            <p className="rounded-sm border-[1.5px] border-red-400 bg-red-50 px-3 py-2.5 text-[12px] font-semibold text-red-600">
              {errorMessage}
            </p>
          )}

          {/* 저장 버튼 */}
          <button
            type="button"
            onClick={submit}
            disabled={isPending || !isSubmittable}
            className="w-full rounded-sm border-2 border-black bg-[#0d0d0d] py-3.5 font-['Jua',sans-serif] text-[16px] text-white disabled:opacity-50"
            style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
          >
            {isPending ? "수정 중..." : "수정하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
