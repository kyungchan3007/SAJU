import {
  getFirstIncompleteFieldMessage,
  getHighlightedZodiac,
  getHighlightedZodiacIndex,
  getStepCompletionState,
  getStepStates,
} from "@/features/saju-input/model/utils";
import type { InputStepItem } from "@/features/saju-input/step/step";
import type { SajuFormValues, TouchedSteps } from "@/features/saju-input/type/type";
import { describe, expect, it } from "vitest";

function createValidFormValues(): SajuFormValues {
  return {
    birthYear: "1992",
    birthDate: "03/14",
    city: "서울",
    calendarType: "solar",
    birthTime: "",
    gender: "male",
    timeUnknown: "true",
  };
}

describe("getHighlightedZodiacIndex", () => {
  it("uses previous year before ipchun (2/4)", () => {
    const beforeIpchun = getHighlightedZodiacIndex("2008", "2/3");
    const afterIpchun = getHighlightedZodiacIndex("2008", "2/4");

    expect(beforeIpchun).toBe(11);
    expect(afterIpchun).toBe(0);
  });

  it("returns null for invalid inputs", () => {
    expect(getHighlightedZodiacIndex("abcd", "2/4")).toBeNull();
    expect(getHighlightedZodiacIndex("2008", "15/4")).toBeNull();
  });
});

describe("getHighlightedZodiac", () => {
  it("returns zodiac item when index is valid", () => {
    expect(getHighlightedZodiac(0)).toMatchObject({ name: "쥐" });
  });

  it("returns null when index is null", () => {
    expect(getHighlightedZodiac(null)).toBeNull();
  });
});

describe("step completion and messaging", () => {
  it("marks all steps complete for valid values", () => {
    const completion = getStepCompletionState(createValidFormValues());
    expect(completion).toEqual({
      isBirthDateStepComplete: true,
      isBirthTimeStepComplete: true,
      isGenderStepComplete: true,
      isAllComplete: true,
    });
  });

  it("returns first missing message in correct priority", () => {
    const noBirthYear = createValidFormValues();
    noBirthYear.birthYear = " ";
    expect(getFirstIncompleteFieldMessage(noBirthYear).title).toBe("출생 연도를 선택해 주세요");

    const noCity = createValidFormValues();
    noCity.city = " ";
    expect(getFirstIncompleteFieldMessage(noCity).title).toBe("출생 도시를 선택해 주세요");

    const partialBirthTime = createValidFormValues();
    partialBirthTime.birthTime = "09:";
    expect(getFirstIncompleteFieldMessage(partialBirthTime).title).toBe(
      "출생 시간을 끝까지 선택해 주세요",
    );
  });
});

describe("getStepStates", () => {
  it("activates only touched and completed steps until final completion", () => {
    const steps: InputStepItem[] = [
      { label: "생년월일", active: false },
      { label: "출생 시간", active: false },
      { label: "성별", active: false },
      { label: "완료", active: false },
    ];
    const touchedSteps: TouchedSteps = {
      birthDate: true,
      birthTime: false,
      gender: true,
    };
    const incompleteValues = createValidFormValues();
    incompleteValues.gender = "";

    const states = getStepStates(steps, touchedSteps, incompleteValues);

    expect(states.map((step) => step.active)).toEqual([true, false, false, false]);
  });

  it("activates final step when all required fields are complete", () => {
    const steps: InputStepItem[] = [
      { label: "생년월일", active: false },
      { label: "출생 시간", active: false },
      { label: "성별", active: false },
      { label: "완료", active: false },
    ];
    const touchedSteps: TouchedSteps = {
      birthDate: true,
      birthTime: true,
      gender: true,
    };

    const states = getStepStates(steps, touchedSteps, createValidFormValues());
    expect(states.map((step) => step.active)).toEqual([true, true, true, true]);
  });
});
