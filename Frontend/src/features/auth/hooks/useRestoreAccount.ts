import { useState } from "react";
import type { Route } from "next";
import { useRouter } from "next/navigation";

export function useRestoreAccount() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRestore() {
    setIsPending(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/restore", { method: "POST" });
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
    fetch("/api/auth/restore/decline", { method: "POST" })
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
