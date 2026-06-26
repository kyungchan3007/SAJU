import { resolveApiErrorMessage } from "@/shared/api";

export class SajuSaveClientError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(resolveApiErrorMessage(code, message));
    this.name = "SajuSaveClientError";
    this.code = code;
  }
}
