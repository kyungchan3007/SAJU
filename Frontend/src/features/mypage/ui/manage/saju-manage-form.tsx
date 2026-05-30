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
import { Button, Card, FormMessage, Select } from "@/shared/ui";

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
    <Card className="overflow-hidden rounded-2xl border-slate-100 shadow-sm">
      <div className="border-b border-slate-100 bg-[#F9F8FF] px-5 py-3">
        <span className="text-sm font-bold text-gray-900">사주 정보 수정</span>
      </div>

      <div className="p-5">
        <div className="flex flex-col gap-5">
          {/* 양력 / 음력 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">
              양력 / 음력 <span className="text-[#5956E9]">*</span>
            </label>
            <div className="flex overflow-hidden rounded-xl border border-[#E5E7EB]">
              {calendarTypeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateField("calendarType", opt.value)}
                  className={`flex-1 border-r border-[#E5E7EB] py-2.5 text-[13px] font-bold transition-all last:border-r-0 ${
                    formState.calendarType === opt.value
                      ? "bg-[#5956E9] text-white"
                      : "bg-white text-slate-400 hover:bg-[#F0EEFF] hover:text-[#5956E9]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 생년월일 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">
              생년월일 <span className="text-[#5956E9]">*</span>
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
                <div key={id}>
                  <Select
                    value={val}
                    onChange={(e) => updateField(field, e.target.value)}
                  >
                    {opts.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Select>
                </div>
              ))}
            </div>
          </div>

          {/* 태어난 시간 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">
              태어난 시간{" "}
              <span className="font-normal text-slate-300">(선택)</span>
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
                <div key={id}>
                  <Select
                    value={val}
                    onChange={(e) => updateField(field, e.target.value)}
                  >
                    {opts.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </Select>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={toggleTimeUnknown}
              className="mt-1 flex items-center gap-2 text-left"
            >
              <span
                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border text-[11px] font-black text-white transition-all"
                style={{
                  background: formState.timeUnknown ? "#5956E9" : "white",
                  borderColor: formState.timeUnknown ? "#5956E9" : "#E5E7EB",
                }}
              >
                {formState.timeUnknown ? "✓" : ""}
              </span>
              <span className="text-[13px] text-slate-500">
                태어난 시간을 모릅니다
              </span>
            </button>
          </div>

          {/* 성별 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">
              성별 <span className="text-[#5956E9]">*</span>
            </label>
            <div className="flex overflow-hidden rounded-xl border border-[#E5E7EB]">
              {genderOptions
                .filter((o) => o.value !== "")
                .map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateField("gender", opt.value)}
                    className={`flex-1 border-r border-[#E5E7EB] py-2.5 text-[13px] font-bold transition-all last:border-r-0 ${
                      formState.gender === opt.value
                        ? "bg-[#5956E9] text-white"
                        : "bg-white text-slate-400 hover:bg-[#F0EEFF] hover:text-[#5956E9]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
            </div>
          </div>

          {/* 태어난 도시 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">
              태어난 도시
            </label>
            <div>
              <Select
                value={formState.city}
                onChange={(e) => updateField("city", e.target.value)}
              >
                {CITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </div>
            <p className="text-[11px] text-slate-400">
              출생 도시는 사주의 지역 보정값 계산에 사용됩니다.
            </p>
          </div>

          {/* 구분선 */}
          <div className="h-px bg-slate-100" />

          {/* 안내 */}
          <FormMessage variant="warning" className="text-[11px] font-medium">
            저장하기를 누르면 상대방과 궁합을 볼수 있어요!
          </FormMessage>

          {/* 에러 */}
          {errorMessage && (
            <FormMessage variant="error">
              {errorMessage}
            </FormMessage>
          )}

          {/* 저장 버튼 */}
          <Button
            type="button"
            onClick={submit}
            disabled={isPending || !isSubmittable}
            className="h-[50px] w-full text-[15px] font-black disabled:opacity-40"
          >
            {isPending ? "수정 중..." : "저장하기"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
