export type ApiMeta = Record<string, unknown>;

export type ApiSuccess<T> = {
  success: true;
  data: T;
  error: null;
  meta?: ApiMeta;
};

export type ApiFailure = {
  success: false;
  data: null;
  error: {
    code: string;
    message: string;
  };
  meta?: ApiMeta;
};

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;

export function createSuccessResponse<T>(
  data: T,
  meta?: ApiMeta,
): ApiSuccess<T> {
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
