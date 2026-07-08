import type {
  CommunityInterestResponse,
} from "@/generated/api";

export type MeetingType = "friend" | "meeting" | null;
export const COMMUNITY_MAX_INTEREST_OPTIONS = 2;

export type CommunityTopicOption = {
  id: string;
  icon: string;
  label?: string;
  elementColor?: string;
  wide?: boolean;
};

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

export function mapCommunityTopicsByMeetingType(
  interests: CommunityInterestResponse[] | undefined,
): {
  friendTopics: CommunityTopicOption[];
  meetingTopics: CommunityTopicOption[];
} {
  const friend = interests?.find((item) => item.type?.includes("친구"));
  const meeting = interests?.find((item) => item.type?.includes("소개"));

  return {
    friendTopics: toTopicOptions(friend),
    meetingTopics: toTopicOptions(meeting),
  };
}

export function resolveCommunityInterestType(
  interests: CommunityInterestResponse[] | undefined,
  selectedType: MeetingType,
): string | undefined {
  if (selectedType === "friend") {
    return interests?.find((item) => item.type?.includes("친구"))?.type;
  }

  if (selectedType === "meeting") {
    return interests?.find((item) => item.type?.includes("소개"))?.type;
  }

  return undefined;
}

function toTopicOptions(
  interest: CommunityInterestResponse | undefined,
): CommunityTopicOption[] {
  const seen = new Set<string>();

  const mapped = (interest?.options ?? []).map((option) => {
    const name = option.name?.trim();
    if (!name) return null;

    const element = option.element?.trim();
    return {
      name,
      icon: getCommunityTopicEmoji(name, element),
      label: element
        ? `${formatTopicDisplayName(name)}\n${toElementLabel(element)}`
        : formatTopicDisplayName(name),
      elementColor: element ? getElementColor(element) : undefined,
    };
  });

  return mapped
    .filter((option): option is NonNullable<typeof option> => option !== null)
    .filter((option) => {
      if (seen.has(option.name)) return false;
      seen.add(option.name);
      return true;
    })
    .map((option) => ({
      id: option.name,
      icon: option.icon,
      label: option.label,
      elementColor: option.elementColor,
    }));
}

function getCommunityTopicEmoji(
  topicName: string,
  element: string | undefined,
): string {
  const legacyEmojiByTopic: Record<string, string> = {
    "한강 산책": "🌊",
    "연애 고민": "💬",
    운동하기: "🏋️",
    카페가기: "☕",
    "영화·전시": "🎬",
    "카페에서 가볍게 대화": "☕",
    "취향으로 가까워지는 소개팅": "🎵",
    "밸런스 게임 대화 소개팅": "🃏",
    "사주궁합 토크 소개팅": "☯️",
    "연애 가치관 토크": "💗",
  };

  if (legacyEmojiByTopic[topicName]) return legacyEmojiByTopic[topicName];

  if (topicName.includes("카페")) return "☕";
  if (topicName.includes("취향")) return "🎵";
  if (topicName.includes("액티비티")) return "🏄‍♂️";
  if (topicName.includes("운동")) return "🏋️";
  if (topicName.includes("밸런스") || topicName.includes("게임")) return "🃏";
  if (topicName.includes("사주") || topicName.includes("궁합")) return "☯️";
  if (topicName.includes("연애") || topicName.includes("가치관")) return "💗";
  if (topicName.includes("산책") || topicName.includes("한강")) return "🌊";
  if (topicName.includes("고민") || topicName.includes("대화")) return "💬";
  if (topicName.includes("영화") || topicName.includes("전시")) return "🎬";

  switch (element) {
    case "수":
      return "🌊";
    case "목":
      return "🌿";
    case "화":
      return "🔥";
    case "토":
      return "⛰️";
    case "금":
      return "💎";
    default:
      return "✨";
  }
}

function toElementLabel(element: string): string {
  switch (element) {
    case "수":
      return "수(水)기운";
    case "목":
      return "목(木)기운";
    case "화":
      return "화(火)기운";
    case "토":
      return "토(土)기운";
    case "금":
      return "금(金)기운";
    default:
      return element;
  }
}

function formatTopicDisplayName(name: string): string {
  return name.replace(/\s+/g, "");
}

function getElementColor(element: string): string {
  switch (element) {
    case "수":
      return "#2563EB";
    case "목":
      return "#16A34A";
    case "화":
      return "#DC2626";
    case "토":
      return "#B45309";
    case "금":
      return "#7C3AED";
    default:
      return "#374151";
  }
}
