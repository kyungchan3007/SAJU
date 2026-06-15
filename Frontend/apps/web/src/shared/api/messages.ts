export const API_ERROR_MESSAGES = {
  LOGIN_REQUIRED: "로그인이 필요합니다.",
  REFRESH_TOKEN_MISSING: "로그인이 필요합니다.",
  TOKEN_REFRESH_FAILED: "로그인 상태를 확인하지 못했습니다. 다시 로그인해주세요.",
  TURNSTILE_REQUIRED: "보안 인증이 필요합니다.",
  INVALID_BODY: "요청 정보를 다시 확인해주세요.",
  INVALID_REQUEST_BODY: "요청 정보를 다시 확인해주세요.",
  INVALID_PARTNER_ID: "대상 정보를 다시 확인해주세요.",
  INVALID_NOTIFICATION_ID: "알림 정보를 다시 확인해주세요.",
  INVALID_LOCATION_SEARCH_QUERY: "위치 검색 조건을 다시 확인해주세요.",
  CSRF_ORIGIN_REQUIRED: "요청을 확인할 수 없습니다. 다시 시도해주세요.",
  CSRF_ORIGIN_MISMATCH: "허용되지 않은 요청입니다.",
  CONFIG_ERROR: "서비스 설정을 확인하지 못했습니다. 잠시 후 다시 시도해주세요.",
  BACKEND_UNAVAILABLE:
    "서비스에 연결하지 못했습니다. 잠시 후 다시 시도해주세요.",
  KAKAO_AUTH_FAILED: "카카오 로그인 요청을 처리하지 못했습니다.",
  AUTH_LOGOUT_FAILED:
    "로그아웃을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
  AUTH_RESTORE_FAILED:
    "계정 복구를 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
  MISSING_TOKEN: "보안 인증 정보를 다시 확인해주세요.",
  VERIFICATION_FAILED: "보안 인증에 실패했습니다. 다시 시도해주세요.",
  PENDING_FORM_NOT_FOUND: "사주 정보를 입력해주세요.",
  SAJU_DAILY_GET_FAILED:
    "오늘의 사주를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  SAJU_POST_FAILED:
    "사주 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  SAJU_PROFILE_GET_FAILED:
    "사주 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  SAJU_UPDATE_FAILED:
    "사주 정보를 저장하지 못했습니다. 잠시 후 다시 시도해주세요.",
  SAJU_TRADITIONAL_GET_FAILED:
    "전통 사주를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  SAJU_TRADITIONAL_FORTUNE_GET_FAILED:
    "정통 운세를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  YEAR_FORTUNE_GET_FAILED:
    "올해 운세를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  PERSONALITY_PROFILE_GET_FAILED:
    "성향 분석을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  ZODIAC_COMPATIBILITY_GET_FAILED:
    "궁합 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  COMPATIBILITY_GET_FAILED:
    "궁합 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  COMMUNITY_COHORTS_GET_FAILED:
    "커뮤니티 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  COMMUNITY_INTERESTS_GET_FAILED:
    "관심사 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  COMMUNITY_JOIN_FAILED:
    "커뮤니티 신청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
  FOOD_RECOMMEND_GET_FAILED:
    "음식 추천을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  PLACE_RECOMMEND_GET_FAILED:
    "장소 추천을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  LOCATION_SEARCH_FAILED:
    "위치 검색 결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  NOTIFICATIONS_GET_FAILED:
    "알림을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  NOTIFICATIONS_UNREAD_COUNT_GET_FAILED:
    "읽지 않은 알림 수를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  NOTIFICATION_READ_FAILED:
    "알림 상태를 변경하지 못했습니다. 잠시 후 다시 시도해주세요.",
  PARTNERS_GET_FAILED:
    "관심 상대 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  PARTNER_REGISTER_FAILED:
    "관심 상대를 등록하지 못했습니다. 잠시 후 다시 시도해주세요.",
  PARTNER_GET_FAILED:
    "관심 상대 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  PARTNER_UPDATE_FAILED:
    "관심 상대 정보를 수정하지 못했습니다. 잠시 후 다시 시도해주세요.",
  PARTNER_DELETE_FAILED:
    "관심 상대를 삭제하지 못했습니다. 잠시 후 다시 시도해주세요.",
  USER_PROFILE_GET_FAILED:
    "내 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  USER_DELETE_FAILED:
    "회원 탈퇴를 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
  UNKNOWN_ERROR: "요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
} as const;

export const API_SUCCESS_MESSAGES = {
  SAJU_RESULT_READY: "사주 결과를 불러왔습니다.",
  SAJU_SAVED: "사주 정보를 저장했습니다.",
} as const;

export type ApiErrorMessageCode = keyof typeof API_ERROR_MESSAGES;
export type ApiSuccessMessageCode = keyof typeof API_SUCCESS_MESSAGES;

export function resolveApiErrorMessage(code: string, fallback?: string) {
  return (
    API_ERROR_MESSAGES[code as ApiErrorMessageCode] ??
    fallback ??
    API_ERROR_MESSAGES.UNKNOWN_ERROR
  );
}

export function resolveApiSuccessMessage(
  codeOrMessage?: string | null,
  fallback?: string,
) {
  if (!codeOrMessage) {
    return fallback;
  }

  return (
    API_SUCCESS_MESSAGES[codeOrMessage as ApiSuccessMessageCode] ??
    codeOrMessage ??
    fallback
  );
}
