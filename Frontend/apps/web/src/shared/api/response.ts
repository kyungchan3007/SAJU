export type ApiMeta = Record<string, unknown>;

export type ApiSuccess<T, TMeta extends ApiMeta = ApiMeta> = {
  success: true;
  data: T;
  error: null;
  meta?: TMeta;
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
): ApiSuccess<T, TMeta> {
  return {
    success: true,
    data,
    error: null,
    meta,
  };
}

export function createErrorResponse(
  code: string,
  message: string,
  meta?: ApiMeta,
): ApiFailure {
  return {
    success: false,
    data: null,
    error: {
      code,
      message,
    },
    meta,
  };
}
