import {
  canSelectCommunityTopic,
  isCommunityInterestSelectionValid,
} from "@/features/community/model/community";
import {
  buildCommunityJoinRequest,
  formatCommunityFee,
  getActiveCommunityMembership,
  isCommunityApplicationFormValid,
  isCommunityNicknameValid,
  normalizeCommunityAccountNumber,
  resolveCommunityDepositAccount,
  resolveCommunityJoinCohortId,
  resolveCommunityMeetingInfo,
  type CommunityApplicationForm,
} from "@/features/community/model/community-application";
import { describe, expect, it } from "vitest";

const VALID_APPLICATION_FORM: CommunityApplicationForm = {
  depositorName: " 홍길동 ",
  refundBankName: " ○○은행 ",
  refundAccountNumber: "000-000-000000",
  refundAccountHolder: " 홍길동 ",
  agreed: true,
  privacyConsent: true,
};

describe("community topic helpers", () => {
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

describe("community rotation application helpers", () => {
  it("validates the nickname", () => {
    expect(isCommunityNicknameValid("햇살")).toBe(true);
    expect(isCommunityNicknameValid("   ")).toBe(false);
    expect(isCommunityNicknameValid("")).toBe(false);
  });

  it("normalizes refund account numbers to digits", () => {
    expect(normalizeCommunityAccountNumber("000-000-000000")).toBe("000000000000");
    expect(normalizeCommunityAccountNumber("우리 1002 123 456")).toBe("1002123456");
  });

  it("validates the deposit/refund application form", () => {
    expect(isCommunityApplicationFormValid(VALID_APPLICATION_FORM)).toBe(true);
    expect(
      isCommunityApplicationFormValid({
        ...VALID_APPLICATION_FORM,
        agreed: false,
      }),
    ).toBe(false);
    expect(
      isCommunityApplicationFormValid({
        ...VALID_APPLICATION_FORM,
        privacyConsent: false,
      }),
    ).toBe(false);
    expect(
      isCommunityApplicationFormValid({
        ...VALID_APPLICATION_FORM,
        refundAccountNumber: "123",
      }),
    ).toBe(false);
    expect(
      isCommunityApplicationFormValid({
        ...VALID_APPLICATION_FORM,
        depositorName: "  ",
      }),
    ).toBe(false);
  });

  it("builds the new join request with trimmed/normalized fields", () => {
    expect(
      buildCommunityJoinRequest(" 햇살 ", VALID_APPLICATION_FORM, 3),
    ).toEqual({
      cohortId: 3,
      nickname: "햇살",
      depositorName: "홍길동",
      refundBankName: "○○은행",
      refundAccountNumber: "000000000000",
      refundAccountHolder: "홍길동",
      refundPolicyAgreed: true,
      privacyAgreed: true,
    });
  });

  it("picks the active membership by status", () => {
    expect(
      getActiveCommunityMembership([
        { memberId: 1, status: "CANCELLED" },
        { memberId: 2, status: "APPLIED" },
      ])?.memberId,
    ).toBe(2);
    expect(
      getActiveCommunityMembership([{ memberId: 1, status: "REFUNDED" }]),
    ).toBeNull();
    expect(getActiveCommunityMembership([])).toBeNull();
    expect(getActiveCommunityMembership(undefined)).toBeNull();
  });

  it("resolves the join cohort id, preferring the active cohort", () => {
    expect(resolveCommunityJoinCohortId({ cohortId: 1, name: "1기" })).toBe(1);
    expect(resolveCommunityJoinCohortId({ cohortId: 7, name: "7기" })).toBe(7);
    expect(resolveCommunityJoinCohortId(undefined)).toBeNull();
  });

  it("formats the fee amount with a fallback", () => {
    expect(formatCommunityFee(50000)).toBe("50,000원");
    expect(formatCommunityFee(undefined)).toBe("50,000원~");
  });

  it("maps current cohort data to meeting info", () => {
    expect(
      resolveCommunityMeetingInfo({
        cohortId: 3,
        name: "3기",
        feeAmount: 45000,
        location: "성수",
      }),
    ).toMatchObject({
      title: "3기",
      stateLabel: "모집중",
      placeLabel: "성수",
      feeLabel: "45,000원",
    });
  });

  it("maps current cohort data to deposit account info", () => {
    expect(
      resolveCommunityDepositAccount({
        bankName: "카카오뱅크",
        bankAccountNumber: "3333-12-1234567",
        bankAccountHolder: "홍길동",
        feeAmount: 45000,
      }),
    ).toEqual({
      bankLabel: "카카오뱅크 3333-12-1234567",
      holderLabel: "예금주 : 홍길동",
      amountLabel: "금액 45,000원",
    });
  });
});
