"use client";

import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

import {
  DialogShell,
  DialogShellDescription,
  DialogShellTitle,
} from "../dialog-shell/dialog-shell";
import { cn } from "../utils";

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
    "bg-saju-primary text-white hover:bg-saju-purple focus-visible:ring-saju-primary",
  destructive:
    "bg-status-danger text-white hover:bg-red-600 focus-visible:ring-status-danger",
};

const iconClassNames: Record<ConfirmModalVariant, string> = {
  default: "bg-saju-light text-saju-primary",
  destructive: "bg-red-50 text-status-danger",
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
    <DialogShell
      isOpen={isOpen}
      onClose={onClose}
      isCloseDisabled={pending}
      contentClassName="text-center"
    >
      <div
        className={cn(
          "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full",
          iconClassNames[normalizedVariant],
        )}
      >
        {icon ?? <AlertTriangle className="h-6 w-6" aria-hidden="true" />}
      </div>

      <DialogShellTitle asChild>
        <h2 className="mb-2 text-saju-title font-black text-content-primary">
          {title}
        </h2>
      </DialogShellTitle>

      {description ? (
        <DialogShellDescription asChild>
          <div className="mb-6 text-saju-body leading-relaxed text-content-subtle">
            {description}
          </div>
        </DialogShellDescription>
      ) : null}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onClose}
          disabled={pending}
          className="flex-1 rounded-xl border-2 border-surface-border py-3 text-saju-section font-bold text-content-subtle hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saju-primary disabled:opacity-50"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={pending}
          className={cn(
            "flex-[2] rounded-xl py-3 text-saju-section font-bold focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50",
            confirmButtonClassNames[normalizedVariant],
          )}
        >
          {pending ? (pendingLabel ?? "처리 중..") : confirmLabel}
        </button>
      </div>

      {errorMessage ? (
        <p className="mt-3 text-saju-label font-medium text-status-danger">
          {errorMessage}
        </p>
      ) : null}
    </DialogShell>
  );
}
