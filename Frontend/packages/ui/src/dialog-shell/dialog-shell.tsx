"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "../utils";

type DialogShellProps = Omit<
  ComponentPropsWithoutRef<typeof Dialog.Content>,
  "children"
> & {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeLabel?: string;
  showCloseButton?: boolean;
  isDismissible?: boolean;
  isCloseDisabled?: boolean;
  overlayClassName?: string;
  contentClassName?: string;
};

export type DialogShellTitleProps = ComponentPropsWithoutRef<typeof Dialog.Title>;
export type DialogShellDescriptionProps = ComponentPropsWithoutRef<
  typeof Dialog.Description
>;

export function DialogShell({
  isOpen,
  onClose,
  children,
  closeLabel = "닫기",
  showCloseButton = true,
  isDismissible = true,
  isCloseDisabled = false,
  overlayClassName,
  contentClassName,
  onEscapeKeyDown,
  onPointerDownOutside,
  onInteractOutside,
  ...contentProps
}: DialogShellProps) {
  const shouldBlockDismiss = !isDismissible || isCloseDisabled;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isCloseDisabled) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-overlay bg-black/40 backdrop-blur-sm",
            overlayClassName,
          )}
        />
        <Dialog.Content
          {...contentProps}
          aria-describedby={contentProps["aria-describedby"]}
          onEscapeKeyDown={(event) => {
            if (shouldBlockDismiss) event.preventDefault();
            onEscapeKeyDown?.(event);
          }}
          onPointerDownOutside={(event) => {
            if (shouldBlockDismiss) event.preventDefault();
            onPointerDownOutside?.(event);
          }}
          onInteractOutside={(event) => {
            if (shouldBlockDismiss) event.preventDefault();
            onInteractOutside?.(event);
          }}
          className={cn(
            "fixed left-1/2 top-1/2 z-modal mx-5 w-[calc(100%-40px)] max-w-saju-modal -translate-x-1/2 -translate-y-1/2 rounded-saju-panel bg-surface-card p-8 shadow-saju-modal focus:outline-none",
            contentClassName,
          )}
        >
          {showCloseButton ? (
            <Dialog.Close
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-content-subtle transition-colors hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saju-primary disabled:pointer-events-none disabled:opacity-50"
              disabled={isCloseDisabled}
              aria-label={closeLabel}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Dialog.Close>
          ) : null}

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function DialogShellTitle(props: DialogShellTitleProps) {
  return <Dialog.Title {...props} />;
}

export function DialogShellDescription(props: DialogShellDescriptionProps) {
  return <Dialog.Description {...props} />;
}
