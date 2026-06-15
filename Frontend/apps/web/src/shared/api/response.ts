import {
  resolveApiErrorMessage,
  resolveApiSuccessMessage,
} from "@/shared/api/messages";

export type ApiMeta = Record<string, unknown>;

export type ApiSuccess<T, TMeta extends ApiMeta = ApiMeta> = {
  success: true;
  data: T;
  error: null;
  meta?: TMeta;
  message?: string;
};

export type ApiFailure<TMeta extends ApiMeta = ApiMeta> = {
  success: false;
  data: null;
  error: {
    code: string;
    message: string;
  };
  meta?: TMeta;
};

export type ApiEnvelope<T, TMeta extends ApiMeta = ApiMeta> =
  | ApiSuccess<T, TMeta>
  | ApiFailure<TMeta>;

export function createSuccessResponse<T, TMeta extends ApiMeta = ApiMeta>(
  data: T,
  meta?: TMeta,
  message?: string,
): ApiSuccess<T, TMeta> {
  const resolvedMessage = resolveApiSuccessMessage(message);

  return {
    success: true,
    data,
    error: null,
    meta,
    ...(resolvedMessage ? { message: resolvedMessage } : {}),
  };
}

export function createErrorResponse(
  code: string,
  messageOrMeta?: string | ApiMeta,
  meta?: ApiMeta,
): ApiFailure {
  const explicitMessage =
    typeof messageOrMeta === "string" ? messageOrMeta : undefined;
  const resolvedMeta =
    typeof messageOrMeta === "string" ? meta : messageOrMeta;

  return {
    success: false,
    data: null,
    error: {
      code,
      message: resolveApiErrorMessage(code, explicitMessage),
    },
    meta: resolvedMeta,
  };
}
