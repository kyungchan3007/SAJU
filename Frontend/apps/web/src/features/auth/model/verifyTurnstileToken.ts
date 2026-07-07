import { SAJU_AUTH_TURNSTILE_VERIFY_PATH } from "@/shared/config/endPoint";

type TurnstileVerifyResult =
  | { success: true }
  | {
      success: false;
      message: string;
    };

const TURNSTILE_VERIFY_TIMEOUT_MS = 8000;

function getErrorMessage(status: number, code?: string, message?: string) {
  if (message) {
    return message;
  }

  if (status >= 500) {
    return "보안 인증 서버에 일시적인 문제가 발생했어요. 잠시 후 다시 시도해주세요.";
  }

  if (code === "MISSING_TOKEN") {
    return "보안 인증이 아직 완료되지 않았어요. 잠시 후 다시 시도해주세요.";
  }

  return "보안 인증에 실패했어요. 다시 시도해주세요.";
}

export async function verifyTurnstileToken(
  token: string,
): Promise<TurnstileVerifyResult> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, TURNSTILE_VERIFY_TIMEOUT_MS);

  try {
    const response = await fetch(SAJU_AUTH_TURNSTILE_VERIFY_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      signal: controller.signal,
    });

    if (response.ok) {
      return { success: true };
    }

    const data = (await response.json().catch(() => null)) as
      | {
          error?: {
            code?: string;
            message?: string;
          };
        }
      | null;

    return {
      success: false,
      message: getErrorMessage(
        response.status,
        data?.error?.code,
        data?.error?.message,
      ),
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        success: false,
        message:
          "보안 인증 응답이 지연되고 있어요. 다시 시도해주세요.",
      };
    }

    return {
      success: false,
      message: "네트워크 문제로 보안 인증에 실패했어요. 다시 시도해주세요.",
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}
