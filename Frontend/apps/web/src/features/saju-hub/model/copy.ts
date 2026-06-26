import {
  FIVE_ELEMENT_CONFIG,
  type FiveElementKey,
} from "@/shared/model/five-elements/model";
import { normalizeFiveElementKey } from "@/shared/model/five-elements/utils";

export type SajuHubCopy = {
  element: FiveElementKey;
  elementLabel: string;
  elementColor: string;
  elementBackground: string;
  elementEmoji: string;
  title: string;
  yongshinDescription: string;
  description: string;
  compatibilityDescription: string;
  companionPrompt: string;
};

const DEFAULT_ELEMENT: FiveElementKey = "수";
const YONGSHIN_DESCRIPTION =
  "용신은 내 사주의 균형을 잡아주고, 나에게 도움이 되는 핵심 기운을 뜻해요.";

const ELEMENT_COMPANION_ELEMENTS: Record<FiveElementKey, FiveElementKey[]> = {
  금: ["수", "토"],
  목: ["화", "수"],
  토: ["금", "화"],
  화: ["토", "목"],
  수: ["금", "토"],
};

const ELEMENT_TRAITS: Record<FiveElementKey, string> = {
  금: "판단이 빠르고 기준이 분명해서 중요한 순간에 결정을 잘 내리는 편이에요.",
  목: "성장 감각이 좋고 관계 안에서 유연하게 방향을 만들어 가는 편이에요.",
  토: "중심이 단단하고 현실 감각이 좋아서 주변을 안정시키는 힘이 있어요.",
  화: "표현력이 좋고 에너지가 밝아서 분위기를 자연스럽게 끌어올리는 편이에요.",
  수: "재능이 많고 참을성이 좋으며, 흔들림에도 쉽게 무너지지 않는 강한 멘탈을 지닌 편이에요.",
};

function isFiveElementKey(value: string): value is FiveElementKey {
  return value in FIVE_ELEMENT_CONFIG;
}

function normalizeYongshinElement(element?: string | null): FiveElementKey {
  if (!element) {
    return DEFAULT_ELEMENT;
  }

  const normalizedKey = normalizeFiveElementKey(element);

  return isFiveElementKey(normalizedKey) ? normalizedKey : DEFAULT_ELEMENT;
}

function formatCompanionElements(elements: FiveElementKey[]) {
  return elements
    .map((element) => FIVE_ELEMENT_CONFIG[element].label)
    .join(", ");
}

export function getSajuHubCopy(yongshin?: string | null): SajuHubCopy {
  const element = normalizeYongshinElement(yongshin);
  const config = FIVE_ELEMENT_CONFIG[element];
  const companionElements = formatCompanionElements(
    ELEMENT_COMPANION_ELEMENTS[element],
  );

  return {
    element,
    elementLabel: config.label,
    elementColor: config.color,
    elementBackground: config.bg,
    elementEmoji: config.emoji,
    title: `나의 용신 오행은 ${config.label}예요`,
    yongshinDescription: YONGSHIN_DESCRIPTION,
    description: `${config.label} 기운을 가진 사람은 ${ELEMENT_TRAITS[element]}`,
    compatibilityDescription: `${config.label} 기운은 ${companionElements} 기운과 잘 어울려요.`,
    companionPrompt: "나와 잘 맞는 기운의 친구나 연인을 만나러 가볼까요?",
  };
}
