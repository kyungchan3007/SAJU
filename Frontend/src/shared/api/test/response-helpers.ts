export function createJsonResponse(
  body: unknown,
  init?: ResponseInit,
): Response {
  return new Response(JSON.stringify(body), {
    status: init?.status ?? 200,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
}

export function createTextResponse(text: string, init?: ResponseInit): Response {
  return new Response(text, {
    status: init?.status ?? 200,
    headers: {
      "Content-Type": "text/plain",
      ...(init?.headers ?? {}),
    },
  });
}
