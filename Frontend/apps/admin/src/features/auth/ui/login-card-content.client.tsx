"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ADMIN_LOGIN_ENDPOINT_PATH } from "@/shared/config/endPoint";

const ERROR_MESSAGES: Record<string, string> = {
  forbidden: "관리자 계정이 아닙니다.",
  invalid_credentials: "관리자 계정 정보를 확인해주세요.",
  login_failed: "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
  INVALID_REQUEST_BODY: "입력값을 확인해주세요.",
};

const DEFAULT_ERROR_MESSAGE = "로그인 중 오류가 발생했습니다. 다시 시도해주세요.";

export function LoginCardContent() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isPending) return;

    setError(null);
    setIsPending(true);

    try {
      const res = await fetch(ADMIN_LOGIN_ENDPOINT_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.replace("/dashboard");
        return;
      }

      const json = (await res.json().catch(() => null)) as {
        message?: string;
      } | null;
      const code = json?.message ?? "";
      setError(ERROR_MESSAGES[code] ?? DEFAULT_ERROR_MESSAGE);
    } catch {
      setError(DEFAULT_ERROR_MESSAGE);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <p className="text-2xl font-bold tracking-tight text-content-primary">
          사주 어드민
        </p>
        <p className="mt-1 text-sm text-content-muted">관리자 전용 페이지입니다</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="username"
            className="text-sm font-medium text-content-primary"
          >
            아이디
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            required
            disabled={isPending}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border border-surface-border bg-white px-3 py-2 text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:ring-2 focus:ring-saju-primary disabled:opacity-50"
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-content-primary"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-surface-border bg-white px-3 py-2 text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:ring-2 focus:ring-saju-primary disabled:opacity-50"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        {error ? (
          <div
            role="alert"
            className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-saju-primary py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
