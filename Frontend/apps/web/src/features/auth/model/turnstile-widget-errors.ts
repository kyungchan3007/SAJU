export const TURNSTILE_WIDGET_MISSING_SITE_KEY = "missing-site-key";

export function getTurnstileWidgetErrorMessage(code?: string) {
  if (!code) {
    return null;
  }

  if (code === TURNSTILE_WIDGET_MISSING_SITE_KEY) {
    return "보안 인증 설정이 누락되어 인증을 시작할 수 없어요. 관리자에게 문의해주세요.";
  }

  if (code.startsWith("11060") || code.startsWith("11062")) {
    return null;
  }

  if (code.startsWith("11050") || code.startsWith("11051")) {
    return "브라우저 환경 때문에 보안 인증을 완료하지 못했어요. 다시 시도해주세요.";
  }

  return null;
}
