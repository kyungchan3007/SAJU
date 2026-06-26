import type { SajuFormValues } from "@/features/saju-input/type/type";

export type PendingSajuForm = {
  formValues?: SajuFormValues;
  exp?: number;
};

export async function readSubmittedSajuFormValue(
  request: Request | undefined,
): Promise<SajuFormValues | null> {
  if (!request) {
    return null;
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return (await request.json()) as SajuFormValues;
  } catch {
    return null;
  }
}

export function readPendingSajuFormValue(
  encoded: string | undefined,
): SajuFormValues | null {
  if (!encoded) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as PendingSajuForm;

    if (!parsed.formValues || typeof parsed.exp !== "number") {
      return null;
    }

    if (parsed.exp < Date.now()) {
      return null;
    }

    return parsed.formValues;
  } catch {
    return null;
  }
}
