import { resolveApiErrorMessage } from "@/shared/api";

export class SajuProfileClientError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(resolveApiErrorMessage(code, message));
    this.name = "SajuProfileClientError";
    this.code = code;
  }
}
