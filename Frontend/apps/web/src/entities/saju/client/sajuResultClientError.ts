const SAJU_RESULT_CLIENT_ERROR_MESSAGES = {
  PENDING_FORM_NOT_FOUND: "사주 정보를 입력해주세요.",
} as const;

export class SajuResultClientError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(resolveSajuResultClientErrorMessage(code, message));
    this.name = "SajuResultClientError";
    this.code = code;
  }
}

function resolveSajuResultClientErrorMessage(code: string, fallback: string) {
  return (
    SAJU_RESULT_CLIENT_ERROR_MESSAGES[
      code as keyof typeof SAJU_RESULT_CLIENT_ERROR_MESSAGES
    ] ?? fallback
  );
}
