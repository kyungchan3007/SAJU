type CachedDailyResult = {
  data?: unknown;
  exp?: number;
};

export function readCachedDailyResult(
  encoded: string | undefined,
): unknown | null {
  if (!encoded) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as CachedDailyResult;

    if (typeof parsed.exp !== "number" || parsed.exp < Date.now()) {
      return null;
    }

    return parsed.data ?? null;
  } catch {
    return null;
  }
}

export function encodeCachedDailyResult(data: unknown, ttlSec: number): string {
  return Buffer.from(
    JSON.stringify({
      data,
      exp: Date.now() + ttlSec * 1000,
    }),
    "utf8",
  ).toString("base64url");
}
