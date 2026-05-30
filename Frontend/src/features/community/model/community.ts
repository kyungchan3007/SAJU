import type {
  CommunityCohortStatusResponse,
  CommunityJoinRequest,
  CommunityJoinResponse,
} from "@/generated/api";

export type MeetingType = "friend" | "meeting" | null;

export type ContactForm = {
  nickname: string;
  ageGroup: string;
  phone: string;
  agreedToPrivacy: boolean;
};

export const COMMUNITY_AGE_GROUP_OPTIONS = ["20대", "30대", "40대", "50대"] as const;

export const COMMUNITY_ACTIVE_COHORT_ID = 1;
export const COMMUNITY_PUBLIC_COUNT_THRESHOLD = 20;
export const COMMUNITY_MAX_INTEREST_OPTIONS = 2;

export function normalizeCommunityPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function buildCommunityJoinPayload(
  form: ContactForm,
  selectedType: MeetingType,
  selectedTopics: string[],
  cohortId: number = COMMUNITY_ACTIVE_COHORT_ID,
): CommunityJoinRequest {
  return {
    cohortId,
    nickname: form.nickname.trim(),
    ageGroup: form.ageGroup,
    phoneNumber: normalizeCommunityPhoneNumber(form.phone),
    privacyConsent: form.agreedToPrivacy,
    interestType: toCommunityInterestType(selectedType),
    interestOptions: selectedTopics.slice(0, COMMUNITY_MAX_INTEREST_OPTIONS),
  };
}

export function isCommunityContactFormValid(form: ContactForm): boolean {
  return (
    form.nickname.trim().length > 0 &&
    form.agreedToPrivacy &&
    COMMUNITY_AGE_GROUP_OPTIONS.includes(
      form.ageGroup as (typeof COMMUNITY_AGE_GROUP_OPTIONS)[number],
    ) &&
    /^01[0-9]{8,9}$/.test(normalizeCommunityPhoneNumber(form.phone))
  );
}

export function isCommunityInterestSelectionValid(
  selectedType: MeetingType,
  selectedTopics: string[],
): boolean {
  return (
    selectedType !== null &&
    selectedTopics.length > 0 &&
    selectedTopics.length <= COMMUNITY_MAX_INTEREST_OPTIONS
  );
}

export function canSelectCommunityTopic(
  selectedTopics: string[],
  topic: string,
): boolean {
  return (
    selectedTopics.includes(topic) ||
    selectedTopics.length < COMMUNITY_MAX_INTEREST_OPTIONS
  );
}

function toCommunityInterestType(
  selectedType: MeetingType,
): CommunityJoinRequest["interestType"] {
  if (selectedType === "friend") return "친구모임";
  if (selectedType === "meeting") return "소개팅";
  return undefined;
}

export function getCommunityJoinedCount(
  cohorts: CommunityCohortStatusResponse[] | undefined,
  joinResult?: CommunityJoinResponse | null,
): number | null {
  if (!cohorts?.length) {
    return null;
  }

  const targetCohort =
    cohorts.find((cohort) => cohort.cohortId === joinResult?.cohortId) ??
    cohorts.find((cohort) => cohort.cohortId === COMMUNITY_ACTIVE_COHORT_ID) ??
    cohorts[0];

  return typeof targetCohort.currentCount === "number"
    ? targetCohort.currentCount
    : null;
}

export function shouldShowCommunityJoinedCount(count: number | null): boolean {
  return count !== null && count >= COMMUNITY_PUBLIC_COUNT_THRESHOLD;
}
