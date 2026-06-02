import {
  buildCommunityJoinPayload,
  canSelectCommunityTopic,
  getCommunityJoinedCount,
  isCommunityInterestSelectionValid,
  isCommunityContactFormValid,
  normalizeCommunityPhoneNumber,
  shouldShowCommunityJoinedCount,
} from "@/features/community/model/community";
import { describe, expect, it } from "vitest";

describe("community join form helpers", () => {
  it("normalizes phone numbers for the join API", () => {
    expect(normalizeCommunityPhoneNumber("010-1234-5678")).toBe("01012345678");
    expect(normalizeCommunityPhoneNumber("010 9876 5432")).toBe("01098765432");
  });

  it("builds join payload with the active cohort id", () => {
    expect(
      buildCommunityJoinPayload({
        nickname: " 햇살 ",
        ageGroup: "20대",
        phone: "010-1234-5678",
        agreedToPrivacy: true,
      }, "friend", ["한강 산책", "카페가기"]),
    ).toEqual({
      cohortId: 1,
      nickname: "햇살",
      ageGroup: "20대",
      phoneNumber: "01012345678",
      privacyConsent: true,
      interestType: "친구모임",
      interestOptions: ["한강 산책", "카페가기"],
    });
  });

  it("validates required contact fields", () => {
    expect(
      isCommunityContactFormValid({
        nickname: "햇살",
        ageGroup: "20대",
        phone: "010-1234-5678",
        agreedToPrivacy: true,
      }),
    ).toBe(true);

    expect(
      isCommunityContactFormValid({
        nickname: "",
        ageGroup: "20대",
        phone: "010-1234-5678",
        agreedToPrivacy: true,
      }),
    ).toBe(false);

    expect(
      isCommunityContactFormValid({
        nickname: "햇살",
        ageGroup: "20대",
        phone: "010-1234-5678",
        agreedToPrivacy: false,
      }),
    ).toBe(false);
  });

  it("validates interest selection count", () => {
    expect(isCommunityInterestSelectionValid("friend", ["한강 산책"])).toBe(true);
    expect(isCommunityInterestSelectionValid("friend", [])).toBe(false);
    expect(
      isCommunityInterestSelectionValid("meeting", [
        "카페에서 가볍게 대화",
        "취향으로 가까워지는 소개팅",
        "연애 가치관 토크",
      ]),
    ).toBe(false);
  });

  it("allows selecting up to two interest topics", () => {
    expect(canSelectCommunityTopic(["한강 산책"], "카페가기")).toBe(true);
    expect(canSelectCommunityTopic(["한강 산책", "카페가기"], "연애 고민")).toBe(
      false,
    );
    expect(canSelectCommunityTopic(["한강 산책", "카페가기"], "한강 산책")).toBe(
      true,
    );
  });
});

describe("community cohort count helpers", () => {
  it("uses the joined cohort count when available", () => {
    const count = getCommunityJoinedCount(
      [
        { cohortId: 1, name: "1기", capacity: 30, currentCount: 18 },
        { cohortId: 2, name: "2기", capacity: 30, currentCount: 23 },
      ],
      { cohortId: 2 },
    );

    expect(count).toBe(23);
  });

  it("shows public count only after threshold", () => {
    expect(shouldShowCommunityJoinedCount(19)).toBe(false);
    expect(shouldShowCommunityJoinedCount(20)).toBe(true);
    expect(shouldShowCommunityJoinedCount(null)).toBe(false);
  });
});
