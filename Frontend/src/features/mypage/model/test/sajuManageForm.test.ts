import type { SajuManageFormValues } from "@/features/mypage/model/sajuManage";
import {
  createSajuManageFormState,
  isSajuManageFormSubmittable,
  toSajuManagePayload,
} from "@/features/mypage/model/sajuManageForm";
import { describe, expect, it } from "vitest";

const initialValues: SajuManageFormValues = {
  birthYear: "1992",
  birthMonth: "3",
  birthDay: "4",
  birthTime: "09:05",
  timeUnknown: false,
  gender: "FEMALE",
  calendarType: "SOLAR",
  city: "서울특별시",
};

describe("createSajuManageFormState", () => {
  it("creates editable form state from initial values", () => {
    expect(createSajuManageFormState(initialValues)).toMatchObject({
      birthYear: "1992",
      birthMonth: "3",
      birthDay: "4",
      hour: "9",
      minute: "5",
      gender: "FEMALE",
    });
  });
});

describe("isSajuManageFormSubmittable", () => {
  it("requires gender and birth date values", () => {
    const state = createSajuManageFormState(initialValues);

    expect(isSajuManageFormSubmittable(state)).toBe(true);
    expect(isSajuManageFormSubmittable({ ...state, gender: "" })).toBe(false);
    expect(isSajuManageFormSubmittable({ ...state, birthDay: "" })).toBe(false);
  });
});

describe("toSajuManagePayload", () => {
  it("builds backend payload from form state", () => {
    const state = createSajuManageFormState(initialValues);

    expect(toSajuManagePayload(state)).toEqual({
      birthDate: "1992-03-04",
      birthTime: "09:05",
      gender: "FEMALE",
      calendarType: "SOLAR",
      city: "서울특별시",
    });
  });

  it("maps leap lunar and unknown time for backend payload", () => {
    const state = createSajuManageFormState({
      ...initialValues,
      birthTime: "",
      timeUnknown: true,
      calendarType: "LUNAR-LEAP",
      city: "",
    });

    expect(toSajuManagePayload(state)).toEqual({
      birthDate: "1992-03-04",
      birthTime: null,
      gender: "FEMALE",
      calendarType: "LUNAR",
      city: null,
    });
  });

  it("returns null when required values are missing", () => {
    const state = createSajuManageFormState({
      ...initialValues,
      birthYear: "",
    });

    expect(toSajuManagePayload(state)).toBeNull();
  });
});
