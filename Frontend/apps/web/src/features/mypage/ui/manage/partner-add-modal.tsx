"use client";

import { useRef, useState } from "react";

import { Button, DialogShell, DialogShellTitle, Input } from "@/shared/ui";
import {
  DEFAULT_RELATION,
  MODAL_TITLE,
  NAME_PLACEHOLDER,
  RELATIONS,
} from "@/features/mypage/model/partner";

type Props = {
  isOpen: boolean;
  isPending: boolean;
  onCloseAction: () => void;
  onConfirmAction: (name: string) => void;
};

export function PartnerAddModal({
  isOpen,
  isPending,
  onCloseAction,
  onConfirmAction,
}: Props) {
  const [name, setName] = useState("");
  const [relation, setRelation] =
    useState<(typeof RELATIONS)[number]>(DEFAULT_RELATION);
  const inputRef = useRef<HTMLInputElement>(null);

  function resetForm() {
    setName("");
    setRelation(DEFAULT_RELATION);
  }

  function handleClose() {
    resetForm();
    onCloseAction();
  }

  function handleConfirm() {
    const trimmed = name.trim();

    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }

    resetForm();
    onConfirmAction(trimmed);
  }

  return (
    <DialogShell
      isOpen={isOpen}
      onClose={handleClose}
      isCloseDisabled={isPending}
      contentClassName="max-w-[380px] bg-white"
      onOpenAutoFocus={(event) => {
        event.preventDefault();
        inputRef.current?.focus();
      }}
    >
      <div className="mb-5 flex items-center justify-between pr-10">
        <DialogShellTitle asChild>
          <h3 className="text-lg font-black text-gray-900">{MODAL_TITLE}</h3>
        </DialogShellTitle>
      </div>

      {/* 단계 표시 */}
      <div className="mb-5 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5956E9] text-[10px] font-black text-white">
            1
          </div>
          <span className="text-[12px] font-bold text-[#5956E9]">기본 정보</span>
        </div>
        <div className="mx-1 h-px w-8 bg-slate-200" />
        <div className="flex items-center gap-1.5 opacity-40">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[10px] font-black text-slate-400">
            2
          </div>
          <span className="text-[12px] font-bold text-slate-400">사주 정보</span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500">
            이름 (별칭) <span className="text-[#5956E9]">*</span>
          </label>
          <Input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleConfirm();
            }}
            placeholder={NAME_PLACEHOLDER}
            maxLength={8}
            className="rounded-xl border-[#E5E7EB] px-4 text-gray-900 placeholder:text-[#D1D5DB]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500">관계</label>
          <div className="flex gap-2">
            {RELATIONS.map((rel) => (
              <button
                key={rel}
                type="button"
                onClick={() => setRelation(rel)}
                className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-bold transition-colors ${
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
        타인의 정보를 입력하는 경우, 이용자는 해당 정보 주체로부터 사전 동의를
        받을 책임이 있습니다.
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
          {isPending ? "추가 중..." : "완료 · 사주 정보 입력하기 →"}
        </Button>
      </div>
    </DialogShell>
  );
}
