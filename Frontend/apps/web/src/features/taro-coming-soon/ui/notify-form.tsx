"use client";

import { useState } from "react";

import { Button, Input } from "@/shared/ui";

export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function handleSubmit() {
    if (!email.includes("@")) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1500);
      return;
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex h-12 items-center justify-center rounded-2xl bg-emerald-500 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(16,185,129,0.28)]">
          신청 완료 ✓
        </div>
        <p className="text-center text-[11px] text-gray-400">
          🎉 오픈 시 알려드릴게요!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소를 입력해주세요"
          status={status === "error" ? "error" : "default"}
          className="h-12 rounded-2xl border-gray-200 px-4 text-gray-900 placeholder:text-gray-300 sm:flex-1"
        />
        <Button
          type="button"
          onClick={handleSubmit}
          className="h-12 whitespace-nowrap rounded-2xl px-5 text-[13px] font-extrabold shadow-[0_4px_16px_rgba(89,86,233,0.28)] hover:opacity-90"
        >
          알림 신청
        </Button>
      </div>
      <p className="text-[11px] text-gray-400">
        🔒 이메일은 오픈 알림 용도로만 사용돼요.
      </p>
    </div>
  );
}
