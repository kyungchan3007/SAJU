import type { PartnerResponse, PartnerRequest, SajuRequest } from "@/generated/api";
import { normalizeSajuCalendarInputType } from "@/shared/model/saju-calendar/utils";
import { parseBackendBirthDateParts } from "@/shared/utils/BirthDate";
import type { SajuManageFormValues } from "./sajuManage";

export const EMPTY_PARTNER_FORM_VALUES: SajuManageFormValues = {
  birthYear: "1990",
  birthMonth: "1",
  birthDay: "1",
  birthTime: "",
  timeUnknown: true,
  gender: "",
  calendarType: "SOLAR",
  city: "",
};

export function toPartnerFormValues(
  partner: PartnerResponse,
): SajuManageFormValues {
  if (!partner.birthDate) return EMPTY_PARTNER_FORM_VALUES;

  const { year, month, day } = parseBackendBirthDateParts(partner.birthDate);

  return {
    birthYear: year,
    birthMonth: month,
    birthDay: day,
    birthTime: partner.birthTime ?? "",
    timeUnknown: !partner.birthTime,
    gender:
      partner.gender === "MALE" || partner.gender === "FEMALE"
        ? partner.gender
        : "",
    calendarType: normalizeSajuCalendarInputType(
      partner.calendarType ?? "SOLAR",
    ),
    city: partner.city ?? "",
  };
}

export function toPartnerRequest(
  name: string,
  payload: SajuRequest,
): PartnerRequest {
  return {
    name,
    birthDate: payload.birthDate,
    birthTime: payload.birthTime,
    gender: payload.gender,
    calendarType: payload.calendarType,
    city: payload.city,
  };
}

export function getPartnerAvatar(partner: PartnerResponse): string {
  if (partner.gender === "FEMALE") return "👩";
  if (partner.gender === "MALE") return "👨";
  return "🧑";
}
