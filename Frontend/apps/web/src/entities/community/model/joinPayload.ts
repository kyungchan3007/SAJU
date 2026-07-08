import type { CommunityJoinRequest } from "@/generated/api";

export type LegacyCommunityJoinRequest = {
  cohortId: number;
  nickname: string;
  ageGroup: string;
  phoneNumber: string;
  privacyConsent: boolean;
  interestType?: string;
  interestOptions: string[];
};

export type CommunityJoinClientPayload =
  | CommunityJoinRequest
  | LegacyCommunityJoinRequest;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isCommunityJoinRequest(
  value: unknown,
): value is CommunityJoinRequest {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.cohortId === "number" &&
    Number.isFinite(value.cohortId) &&
    isNonEmptyString(value.nickname) &&
    isNonEmptyString(value.depositorName) &&
    isNonEmptyString(value.refundBankName) &&
    isNonEmptyString(value.refundAccountNumber) &&
    isNonEmptyString(value.refundAccountHolder) &&
    value.refundPolicyAgreed === true &&
    value.privacyAgreed === true
  );
}
