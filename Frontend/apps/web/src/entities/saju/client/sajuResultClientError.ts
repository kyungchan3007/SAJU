import { resolveApiErrorMessage } from "@/shared/api";

export class SajuResultClientError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(resolveSajuResultClientErrorMessage(code, message));
    this.name = "SajuResultClientError";
    this.code = code;
  }
}

function resolveSajuResultClientErrorMessage(code: string, fallback: string) {
  return resolveApiErrorMessage(code, fallback);
}
