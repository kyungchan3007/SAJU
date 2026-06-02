import type { SajuManageFormValues } from "@/features/mypage/model/sajuManage";
import type { SajuRequest } from "@/generated/api";
import type { SajuCalendarInputType } from "@/shared/model/saju-calendar/model";
import {
  isSajuCalendarInputType,
  toBackendSajuCalendarType,
} from "@/shared/model/saju-calendar/utils";
import { parseTimeParts } from "@/shared/utils/Time";

export type SajuManageFormState = {
  calendarType: SajuCalendarInputType;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  hour: string;
  minute: string;
  timeUnknown: boolean;
  gender: "MALE" | "FEMALE" | "";
  city: string;
};

export function createSajuManageFormState(
  initialValues: SajuManageFormValues,
): SajuManageFormState {
  const time = parseTimeParts(initialValues.birthTime);

  return {
    calendarType: initialValues.calendarType,
    birthYear: initialValues.birthYear,
    birthMonth: initialValues.birthMonth,
    birthDay: initialValues.birthDay,
    hour: time.hour,
    minute: time.minute || "0",
    timeUnknown: initialValues.timeUnknown,
    gender: initialValues.gender,
    city: initialValues.city,
  };
}

export function isSajuManageFormSubmittable(
  state: SajuManageFormState,
): state is SajuManageFormState & { gender: "MALE" | "FEMALE" } {
  return !!(
    state.gender &&
    state.birthYear &&
    state.birthMonth &&
    state.birthDay &&
    isSajuCalendarInputType(state.calendarType)
  );
}

export function toSajuManagePayload(
  state: SajuManageFormState,
): SajuRequest | null {
  if (!isSajuManageFormSubmittable(state)) {
    return null;
  }

  return {
    birthDate: toSajuManageBirthDate(state),
    birthTime: toSajuManageBirthTime(state),
    gender: state.gender,
    calendarType: toBackendSajuCalendarType(state.calendarType),
    city: state.city || null,
  };
}

function toSajuManageBirthDate(state: SajuManageFormState) {
  return `${state.birthYear}-${state.birthMonth.padStart(2, "0")}-${state.birthDay.padStart(2, "0")}`;
}

function toSajuManageBirthTime(state: SajuManageFormState) {
  if (state.timeUnknown || !state.hour) {
    return null;
  }

  return `${state.hour.padStart(2, "0")}:${state.minute.padStart(2, "0")}`;
}
