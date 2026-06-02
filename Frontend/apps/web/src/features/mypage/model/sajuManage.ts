import type { SajuProfileResponse } from "@/generated/api";
import { normalizeSajuCalendarInputType } from "@/shared/model/saju-calendar/utils";
import { parseBackendBirthDateParts } from "@/shared/utils/BirthDate";
import type { SajuCalendarInputType } from "@/shared/model/saju-calendar/model";

export type SajuManageFormValues = {
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthTime: string;
  timeUnknown: boolean;
  gender: "MALE" | "FEMALE" | "";
  calendarType: SajuCalendarInputType;
  city: string;
};

export type SajuManageSummaryValues = {
  summaryZodiac?: string | null;
  summaryStrength?: string | null;
  geokguk?: string | null;
  yongshinPrimary?: string | null;
  yongshinSecondary?: string | null;
};

export function toSajuManageFormValues(
  profile: SajuProfileResponse,
): SajuManageFormValues {
  const { year, month, day } = parseBackendBirthDateParts(profile.birthDate);

  return {
    birthYear: year,
    birthMonth: month,
    birthDay: day,
    birthTime: profile.birthTime ?? "",
    timeUnknown: !profile.birthTime,
    gender:
      profile.gender === "MALE" || profile.gender === "FEMALE"
        ? profile.gender
        : "",
    calendarType: normalizeSajuCalendarInputType(profile.calendarType),
    city: profile.city ?? "",
  };
}

export function toSajuManageSummaryValues(
  traits?: Record<string, unknown>,
): SajuManageSummaryValues {
  return {
    summaryZodiac: asNullableString(traits?.summaryZodiac),
    summaryStrength: asNullableString(traits?.summaryStrength),
    geokguk: asNullableString(traits?.geokguk),
    yongshinPrimary: asNullableString(traits?.yongshinPrimary),
    yongshinSecondary: asNullableString(traits?.yongshinSecondary),
  };
}

function asNullableString(value: unknown) {
  return typeof value === "string" ? value : null;
}
