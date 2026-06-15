export const ERROR_PAGE_COPY = {
  SAJU_PROFILE_LOAD_FAILED: {
    title: "사주 정보를 불러오지 못했습니다",
    description: "잠시 후 다시 시도해 주세요.",
  },
  SAJU_RESULT_LOAD_FAILED: {
    title: "사주 결과를 불러오지 못했습니다",
    description: "잠시 후 다시 시도해 주세요.",
  },
  PERSONALITY_REPORT_LOAD_FAILED: {
    title: "상세 성향 리포트를 불러오지 못했습니다",
    description: "잠시 후 다시 시도해 주세요.",
  },
  PERSONALITY_REPORT_NOT_FOUND: {
    title: "상세 성향 리포트를 찾을 수 없습니다",
    description: "사주 분석 정보가 준비된 뒤 다시 확인해 주세요.",
  },
  FOOD_RECOMMEND_LOAD_FAILED: {
    title: "메뉴 추천을 불러오지 못했어요",
    description: "잠시 후 다시 확인해 주세요.",
  },
  TRADITIONAL_FORTUNE_LOAD_FAILED: {
    title: "데이터를 불러오지 못했어요",
    description: "사주 데이터를 불러오지 못했습니다.",
  },
  JEONGTONGSAJU_LOAD_FAILED: {
    title: "사주 정보를 불러오지 못했습니다",
    description: "잠시 후 다시 확인해 주세요.",
  },
  UNKNOWN: {
    title: "오류가 발생했습니다",
    description: "잠시 후 다시 시도해 주세요.",
  },
} as const;

export type ErrorPageCode = keyof typeof ERROR_PAGE_COPY;

type BuildErrorPagePathParams = {
  code: ErrorPageCode;
};

type ResolveErrorPageCopyParams = {
  code?: string | null;
};

export function buildErrorPagePath({ code }: BuildErrorPagePathParams) {
  const params = new URLSearchParams({ code });
  return `/error?${params.toString()}`;
}

export function resolveErrorPageCopy({
  code,
}: ResolveErrorPageCopyParams) {
  const resolvedCode =
    code && code in ERROR_PAGE_COPY ? (code as ErrorPageCode) : "UNKNOWN";

  return {
    code: resolvedCode,
    ...ERROR_PAGE_COPY[resolvedCode],
  };
}
