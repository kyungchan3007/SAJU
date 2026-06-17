type BackendParseSuccess<T> = {
  success: true;
  data: T | undefined;
};

type BackendParseFailure = {
  success: false;
  status: number;
  message: string;
};

export type BackendParseResult<T> = BackendParseSuccess<T> | BackendParseFailure;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function parseBackendApiResponse<T>(
  response: Response,
  fallbackMessage: string,
): Promise<BackendParseResult<T>> {
  let body: unknown = null;

  try {
    body = await response.json();
  } catch {
    body = null;
  }

  const message =
    isRecord(body) && typeof body.message === "string" ? body.message : null;
  const data = isRecord(body) ? (body.data as T | undefined) : undefined;

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      message: message ?? `${fallbackMessage} (${response.status}).`,
    };
  }

  return {
    success: true,
    data,
  };
}
