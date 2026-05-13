"use client";

import { useState, useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
};

export function PartnerAddModal({
  isOpen,
  isPending,
  onClose,
  onConfirm,
}: Props) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  function handleConfirm() {
    const trimmed = name.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    onConfirm(trimmed);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(13,13,13,0.45)] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="mx-5 w-full max-w-[360px] rounded-lg border-2 border-black bg-[#FDFCF8] p-6"
        style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
      >
        <div className="mb-4 flex items-center justify-between font-display text-[17px]">
          <span>사주 추가</span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-sm border-2 border-black bg-[#F0EDE6] text-[14px]"
          >
            ✕
          </button>
        </div>

        <div className="mb-3.5 flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-[#7a7570]">
            이름 (별칭)
          </label>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirm();
            }}
            placeholder="예: 아빠, 친구, 홍길동"
            maxLength={8}
            className="rounded-sm border-2 border-black bg-[#FDFCF8] px-3 py-2.5 text-[14px] font-semibold outline-none focus:[box-shadow:4px_4px_0_#0d0d0d]"
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
          />
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 rounded-sm border-2 border-black bg-[#F0EDE6] py-2.5 font-display text-[14px] disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isPending || !name.trim()}
            className="flex-[2] rounded-sm border-2 border-black bg-[#0d0d0d] py-2.5 font-display text-[14px] text-white disabled:opacity-50"
            style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
          >
            {isPending ? "추가 중..." : "다음 — 사주 입력 →"}
          </button>
        </div>
      </div>
    </div>
  );
}
