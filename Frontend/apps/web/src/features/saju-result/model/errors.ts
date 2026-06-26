import { SajuResultClientError } from "@/entities/saju";

export function isSajuResultLoginRequiredError(error: unknown) {
  return (
    error instanceof SajuResultClientError &&
    (error.code === "LOGIN_REQUIRED" || error.code === "REFRESH_TOKEN_MISSING")
  );
}

export function isSajuResultPendingFormRequiredError(error: unknown) {
  return (
    error instanceof SajuResultClientError &&
    error.code === "PENDING_FORM_NOT_FOUND"
  );
}
