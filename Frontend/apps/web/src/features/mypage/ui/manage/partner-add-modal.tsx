"use client";

import { useState, useEffect, useRef } from "react";

import { Button, Input } from "@/shared/ui";

const RELATIONS = ["가족", "친구", "연인"] as const;

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
  const [relation, setRelation] = useState<(typeof RELATIONS)[number]>("가족");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  function handleClose() {
    setName("");
    setRelation("가족");
    onClose();
  }

  function handleConfirm() {
    const trimmed = name.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    setName("");
    setRelation("가족");
    onConfirm(trimmed);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="mx-5 w-full max-w-[380px] rounded-[24px] bg-white p-8"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.16)" }}
      >
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-black text-gray-900">사주 추가</h3>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-slate-400 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {/* 이름 */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500">
              이름 (별칭) <span className="text-[#5956E9]">*</span>
            </label>
            <Input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleConfirm();
              }}
              placeholder="예: 아빠, 친구, 홍길동"
              maxLength={8}
              className="rounded-xl border-[#E5E7EB] px-4 text-gray-900 placeholder:text-[#D1D5DB]"
            />
          </div>

          {/* 관계 */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500">관계</label>
            <div className="flex gap-2">
              {RELATIONS.map((rel) => (
                <button
                  key={rel}
                  type="button"
                  onClick={() => setRelation(rel)}
                  className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-bold transition-all ${
                    relation === rel
                      ? "border-[#5956E9] bg-[#F0EEFF] text-[#5956E9]"
                      : "border-slate-200 text-slate-400 hover:border-[#5956E9] hover:text-[#5956E9]"
                  }`}
                >
                  {rel}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 text-[11px] leading-relaxed text-slate-400">
          타인의 정보를 입력하는 경우, 이용자는 해당 정보 주체로부터 사전 동의를 받을 책임이 있습니다.
        </p>

        <div className="mt-3 flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isPending}
            className="h-auto flex-1 rounded-xl border-2 border-slate-200 py-3 text-sm font-bold text-slate-400 hover:bg-slate-50 disabled:opacity-50"
          >
            취소
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isPending || !name.trim()}
            className="h-auto flex-[2] rounded-xl py-3 text-sm font-bold disabled:opacity-50"
          >
            {isPending ? "추가 중..." : "다음 사주 입력 →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
