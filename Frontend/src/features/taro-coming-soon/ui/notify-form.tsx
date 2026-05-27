"use client";

import { useState } from "react";

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
        <div className="flex h-12 items-center justify-center rounded-2xl bg-emerald-500 font-bold text-[13px] text-white shadow-[0_4px_16px_rgba(16,185,129,0.28)]">
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
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소를 입력해주세요"
          className={`h-12 flex-1 rounded-2xl border px-4 text-[13px] text-gray-900 outline-none transition-all placeholder:text-gray-300 focus:shadow-[0_0_0_3px_rgba(89,86,233,0.10)] focus:border-[#5956E9] ${
            status === "error" ? "border-red-400" : "border-gray-200"
          }`}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="h-12 whitespace-nowrap rounded-2xl bg-gradient-to-r from-[#5956E9] to-violet-700 px-5 text-[13px] font-extrabold text-white shadow-[0_4px_16px_rgba(89,86,233,0.28)] transition-opacity hover:opacity-90"
        >
          알림 신청
        </button>
      </div>
      <p className="text-[11px] text-gray-400">
        🔒 이메일은 오픈 알림 용도로만 사용돼요.
      </p>
    </div>
  );
}
