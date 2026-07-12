import type {
  CurrentCohortResponse,
  CommunityJoinRequest,
  CommunityJoinResponse,
  MyMembershipResponse,
} from "@/generated/api";

export type CommunityApplicationForm = {
  depositorName: string;
  refundBankName: string;
  refundAccountNumber: string;
  refundAccountHolder: string;
  agreed: boolean;
  privacyConsent: boolean;
};

export type CommunityNicknameCheckStatus =
  | "idle"
  | "checking"
  | "available"
  | "duplicate"
  | "error";

export type CommunityMeetingInfo = {
  title: string;
  stateLabel: string;
  dateLabel: string;
  placeLabel: string;
  feeLabel: string;
  feeNote: string;
};

export type CommunityDepositAccount = {
  bankLabel: string;
  holderLabel: string;
  amountLabel: string;
};

export const COMMUNITY_ACTIVE_MEMBERSHIP_STATUSES = [
  "APPLIED",
  "DEPOSIT_CONFIRMED",
  "CONFIRMED",
  "REFUND_PENDING",
] as const satisfies ReadonlyArray<NonNullable<MyMembershipResponse["status"]>>;

export const COMMUNITY_CANCELABLE_MEMBERSHIP_STATUSES = [
  "APPLIED",
  "DEPOSIT_CONFIRMED",
] as const satisfies ReadonlyArray<NonNullable<MyMembershipResponse["status"]>>;

export const COMMUNITY_MEETING_INFO: CommunityMeetingInfo = {
  title: "1회차 로테이션 소개팅",
  stateLabel: "모집중",
  dateLabel: "8/7(목) 19:00",
  placeLabel: "강남 (예정)",
  feeLabel: "50,000원~",
  feeNote: "시장조사 후 7/12 확정 · 정원·잔여 표기는 없어요",
};

export const COMMUNITY_UNAVAILABLE_MEETING_INFO: CommunityMeetingInfo = {
  ...COMMUNITY_MEETING_INFO,
  stateLabel: "준비중",
  feeLabel: "0원",
  feeNote: "아직 신청 가능한 회차가 열리지 않았어요",
};

export const COMMUNITY_DEPOSIT_ACCOUNT: CommunityDepositAccount = {
  bankLabel: "○○은행 000-0000-0000",
  holderLabel: "예금주 : saju:me 모임",
  amountLabel: "금액 50,000원",
};

export const COMMUNITY_UNAVAILABLE_DEPOSIT_ACCOUNT: CommunityDepositAccount = {
  bankLabel: "신청 기간이 아니에요",
  holderLabel: "신청 가능한 회차가 열리면 계좌를 안내해드려요",
  amountLabel: "금액 0원",
};

export type CommunityCompletionInfo = {
  feeAmount?: number;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountHolder?: string;
};

export function normalizeCommunityAccountNumber(accountNumber: string): string {
  return accountNumber.replace(/[^0-9]/g, "");
}

export function isCommunityNicknameValid(nickname: string): boolean {
  return nickname.trim().length > 0;
}

export function isCommunityApplicationFormValid(
  form: CommunityApplicationForm,
): boolean {
  return (
    form.depositorName.trim().length > 0 &&
    form.refundBankName.trim().length > 0 &&
    normalizeCommunityAccountNumber(form.refundAccountNumber).length >= 6 &&
    form.refundAccountHolder.trim().length > 0 &&
    form.agreed &&
    form.privacyConsent
  );
}

export function buildCommunityJoinRequest(
  nickname: string,
  form: CommunityApplicationForm,
  cohortId: number,
): CommunityJoinRequest {
  return {
    cohortId,
    nickname: nickname.trim(),
    depositorName: form.depositorName.trim(),
    refundBankName: form.refundBankName.trim(),
    refundAccountNumber: normalizeCommunityAccountNumber(form.refundAccountNumber),
    refundAccountHolder: form.refundAccountHolder.trim(),
    refundPolicyAgreed: form.agreed,
    privacyAgreed: form.privacyConsent,
  };
}

export function getActiveCommunityMembership(
  memberships: MyMembershipResponse[] | undefined,
): MyMembershipResponse | null {
  if (!memberships?.length) return null;

  return (
    memberships.find(
      (membership) =>
        membership.status !== undefined &&
        (COMMUNITY_ACTIVE_MEMBERSHIP_STATUSES as readonly string[]).includes(
          membership.status,
        ),
    ) ?? null
  );
}

export function getLatestCommunityMembership(
  memberships: MyMembershipResponse[] | undefined,
): MyMembershipResponse | null {
  return memberships?.[0] ?? null;
}

export function isCommunityMembershipCancelable(
  membership: MyMembershipResponse | null | undefined,
): boolean {
  if (!membership?.status) {
    return false;
  }

  return (COMMUNITY_CANCELABLE_MEMBERSHIP_STATUSES as readonly string[]).includes(
    membership.status,
  );
}

export function resolveCommunityJoinCohortId(
  cohort: CurrentCohortResponse | undefined,
): number | null {
  return cohort?.cohortId ?? null;
}

export function resolveCommunityCompletionInfo(
  joinResult: CommunityJoinResponse | null | undefined,
  activeMembership: MyMembershipResponse | null,
): CommunityCompletionInfo {
  return {
    feeAmount: joinResult?.feeAmount ?? activeMembership?.feeAmount,
    bankName: joinResult?.bankName ?? activeMembership?.bankName,
    bankAccountNumber:
      joinResult?.bankAccountNumber ?? activeMembership?.bankAccountNumber,
    bankAccountHolder:
      joinResult?.bankAccountHolder ?? activeMembership?.bankAccountHolder,
  };
}

export function formatCommunityFee(feeAmount: number | undefined): string {
  if (typeof feeAmount !== "number") return COMMUNITY_MEETING_INFO.feeLabel;
  return `${feeAmount.toLocaleString("ko-KR")}원`;
}

export function resolveCommunityMeetingInfo(
  cohort: CurrentCohortResponse | undefined,
): CommunityMeetingInfo {
  if (!cohort) {
    return COMMUNITY_UNAVAILABLE_MEETING_INFO;
  }

  return {
    title: cohort.name?.trim() || COMMUNITY_MEETING_INFO.title,
    stateLabel: "모집중",
    dateLabel: cohort.expiredAt
      ? formatCommunityDateLabel(cohort.expiredAt)
      : COMMUNITY_MEETING_INFO.dateLabel,
    placeLabel: cohort.location?.trim() || COMMUNITY_MEETING_INFO.placeLabel,
    feeLabel: formatCommunityFee(cohort.feeAmount),
    feeNote: COMMUNITY_MEETING_INFO.feeNote,
  };
}

export function resolveCommunityDepositAccount(
  cohort: CurrentCohortResponse | undefined,
): CommunityDepositAccount {
  if (!cohort) {
    return COMMUNITY_UNAVAILABLE_DEPOSIT_ACCOUNT;
  }

  return {
    bankLabel:
      cohort.bankName && cohort.bankAccountNumber
        ? `${cohort.bankName} ${cohort.bankAccountNumber}`
        : COMMUNITY_DEPOSIT_ACCOUNT.bankLabel,
    holderLabel: cohort.bankAccountHolder
      ? `예금주 : ${cohort.bankAccountHolder}`
      : COMMUNITY_DEPOSIT_ACCOUNT.holderLabel,
    amountLabel:
      typeof cohort.feeAmount === "number"
        ? `금액 ${formatCommunityFee(cohort.feeAmount)}`
        : COMMUNITY_DEPOSIT_ACCOUNT.amountLabel,
  };
}

function formatCommunityDateLabel(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return COMMUNITY_MEETING_INFO.dateLabel;
  }

  return `${date.getMonth() + 1}/${date.getDate()} 모집 마감`;
}
