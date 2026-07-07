import { useState } from "react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import {
  SAJU_AUTH_RESTORE_DECLINE_PATH,
  SAJU_AUTH_RESTORE_PATH,
} from "@/shared/config/endPoint";

export function useRestoreAccount() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRestore() {
    setIsPending(true);
    setError(null);
    try {
      const res = await fetch(SAJU_AUTH_RESTORE_PATH, { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(
          (data as { message?: string }).message ?? "계정 복구에 실패했어요.",
        );
        return;
      }
      router.push("/home" as Route);
    } catch {
      setError("계정 복구 중 오류가 발생했어요.");
    } finally {
      setIsPending(false);
    }
  }

  function handleSkip() {
    setIsPending(true);
    setError(null);
    fetch(SAJU_AUTH_RESTORE_DECLINE_PATH, { method: "POST" })
      .catch(() => {
        // Ignore decline errors and move user out of restore flow.
      })
      .finally(() => {
        setIsPending(false);
        window.location.replace("/");
      });
  }

  return { isPending, error, handleRestore, handleSkip };
}
