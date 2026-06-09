"use client";

import { calendarTypeOptions, genderOptions } from "@/features/saju-input/model/constants";
import { useSajuManageForm } from "@/features/mypage/hooks/useSajuManageForm";
import type { SajuManageFormValues } from "@/features/mypage/model/sajuManage";
import type { SajuRequest } from "@/generated/api";
import { CITY_OPTIONS } from "@/shared/model/city-options/model";
import { HOUR_OPTIONS, MINUTE_OPTIONS } from "@/shared/model/date-time-options/model";
import {
  BirthTimeFields,
  Button,
  Card,
  FormMessage,
  SegmentedButtonGroup,
  Select,
} from "@/shared/ui";

import { SajuManageBirthDateFields } from "./saju-manage-birth-date-fields";

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
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">
              양력 / 음력 <span className="text-[#5956E9]">*</span>
            </label>
            <SegmentedButtonGroup
              value={formState.calendarType}
              options={calendarTypeOptions}
              onChange={(value) => updateField("calendarType", value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">
              생년월일 <span className="text-[#5956E9]">*</span>
            </label>
            <SajuManageBirthDateFields
              formState={formState}
              onChangeField={updateField}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">
              출생 시간 <span className="font-normal text-slate-300">(선택)</span>
            </label>
            <BirthTimeFields
              birthHour={formState.hour}
              birthMinute={formState.minute}
              isTimeUnknown={formState.timeUnknown}
              hourOptions={HOUR_OPTIONS}
              minuteOptions={MINUTE_OPTIONS}
              onChangeBirthTime={(part, value) => updateField(part, value)}
              onToggleTimeUnknown={toggleTimeUnknown}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">
              성별 <span className="text-[#5956E9]">*</span>
            </label>
            <SegmentedButtonGroup
              value={formState.gender}
              options={genderOptions.filter((option) => option.value !== "")}
              onChange={(value) => updateField("gender", value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500">출생 도시</label>
            <div>
              <Select
                value={formState.city}
                onChange={(event) => updateField("city", event.target.value)}
              >
                {CITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <p className="text-[11px] text-slate-400">
              출생 도시는 사주 계산 시 지역 보정값을 적용할 때 사용됩니다.
            </p>
          </div>

          <div className="h-px bg-slate-100" />

          <FormMessage variant="warning" className="text-[11px] font-medium">
            저장 후에는 상대방과의 궁합도 다시 확인할 수 있어요.
          </FormMessage>

          {errorMessage ? (
            <FormMessage variant="error">{errorMessage}</FormMessage>
          ) : null}

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
