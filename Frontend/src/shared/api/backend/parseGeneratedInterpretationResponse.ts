type GeneratedInterpretationSuccess<T> = {
  success: true;
  data: T | undefined;
  meta: GeneratedInterpretationMeta;
};

type GeneratedInterpretationFailure = {
  success: false;
  status: number;
  message: string;
};

export type GeneratedInterpretationMeta = {
  backendStatus?: unknown;
  backendMessage?: string;
  backendErrorCode?: string | null;
};

export type GeneratedInterpretationResult<T> =
  | GeneratedInterpretationSuccess<T>
  | GeneratedInterpretationFailure;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readMessage(body: unknown) {
  return isRecord(body) && typeof body.message === "string"
    ? body.message
    : undefined;
}

function readErrorCode(body: unknown) {
  if (!isRecord(body)) {
    return undefined;
  }

  if (typeof body.errorCode === "string" || body.errorCode === null) {
    return body.errorCode;
  }

  return undefined;
}

export async function parseGeneratedInterpretationResponse<T>(
  response: Response,
  fallbackMessage: string,
): Promise<GeneratedInterpretationResult<T>> {
  let body: unknown = null;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  const message = readMessage(body);

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      message: message ?? `${fallbackMessage} (${response.status}).`,
    };
  }

  return {
    success: true,
    data: isRecord(body) ? (body.data as T | undefined) : undefined,
    meta: {
      backendStatus: isRecord(body) ? body.status : undefined,
      backendMessage: message,
      backendErrorCode: readErrorCode(body),
    },
  };
}
