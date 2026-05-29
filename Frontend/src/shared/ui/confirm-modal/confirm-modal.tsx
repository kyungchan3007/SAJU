"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

// [DS] 역할: 확인/취소가 필요한 destructive 또는 default 액션을 처리하는 공용 확인 모달.
// [DS] 현재 사용처: 계정 로그아웃/탈퇴, 마이페이지 사주 삭제 확인 흐름.
type ConfirmModalVariant = "default" | "destructive";
type LegacyConfirmVariant = "primary" | "danger";

type Props = {
  isOpen: boolean;
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
  confirmLabel?: string;
  pendingLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  isLoading?: boolean;
  errorMessage?: string | null;
  variant?: ConfirmModalVariant;
  confirmVariant?: LegacyConfirmVariant;
  onClose: () => void;
  onConfirm: () => void;
};

const confirmButtonClassNames: Record<ConfirmModalVariant, string> = {
  default:
    "bg-[#5956E9] text-white hover:bg-[#4B49D3] focus-visible:ring-[#5956E9]",
  destructive:
    "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
};

const iconClassNames: Record<ConfirmModalVariant, string> = {
  default: "bg-[#F0EEFF] text-[#5956E9]",
  destructive: "bg-red-50 text-red-500",
};

export function ConfirmModal({
  isOpen,
  title,
  description,
  icon,
  confirmLabel = "확인",
  pendingLabel,
  cancelLabel = "취소",
  isPending = false,
  isLoading = false,
  errorMessage,
  variant = "default",
  confirmVariant,
  onClose,
  onConfirm,
}: Props) {
  const normalizedVariant =
    confirmVariant === "danger"
      ? "destructive"
      : confirmVariant === "primary"
        ? "default"
        : variant;
  const pending = isPending || isLoading;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !pending) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 mx-5 w-[calc(100%-40px)] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-white p-8 text-center shadow-[0_8px_40px_rgba(0,0,0,0.16)]",
            "focus:outline-none",
          )}
        >
          <Dialog.Close
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5956E9] disabled:pointer-events-none disabled:opacity-50"
            disabled={pending}
            aria-label="닫기"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Dialog.Close>

          <div
            className={cn(
              "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full",
              iconClassNames[normalizedVariant],
            )}
          >
            {icon ?? <AlertTriangle className="h-6 w-6" aria-hidden="true" />}
          </div>

          <Dialog.Title className="mb-2 text-[17px] font-black text-gray-900">
            {title}
          </Dialog.Title>

          {description ? (
            <Dialog.Description asChild>
              <div className="mb-6 text-[13px] leading-relaxed text-slate-400">
                {description}
              </div>
            </Dialog.Description>
          ) : null}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="flex-1 rounded-xl border-2 border-slate-200 py-3 text-[14px] font-bold text-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5956E9] disabled:opacity-50"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={pending}
              className={cn(
                "flex-[2] rounded-xl py-3 text-[14px] font-bold focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50",
                confirmButtonClassNames[normalizedVariant],
              )}
            >
              {pending ? (pendingLabel ?? "처리 중...") : confirmLabel}
            </button>
          </div>

          {errorMessage ? (
            <p className="mt-3 text-[12px] font-medium text-red-500">
              {errorMessage}
            </p>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
