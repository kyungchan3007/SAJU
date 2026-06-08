"use client";

import { useEffect, useState } from "react";

const TOAST_EVENT = "saju:toast";
const DURATION = 3000;
const EXIT_MS = 220;

type ToastVariant = "success" | "error" | "info" | "warning";

interface ToastPayload {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastItem extends ToastPayload {
  visible: boolean;
}

function emit(message: string, variant: ToastVariant) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ToastPayload>(TOAST_EVENT, {
      detail: { id: crypto.randomUUID(), message, variant },
    }),
  );
}

export const toast = {
  success: (message: string) => emit(message, "success"),
  error: (message: string) => emit(message, "error"),
  info: (message: string) => emit(message, "info"),
  warning: (message: string) => emit(message, "warning"),
};

const accent: Record<ToastVariant, string> = {
  success: "#16A34A",
  error: "#DC2626",
  info: "#2563EB",
  warning: "#D97706",
};

const icon: Record<ToastVariant, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
  warning: "⚠",
};

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    function onToast(e: Event) {
      const { id, message, variant } = (e as CustomEvent<ToastPayload>).detail;

      setItems((prev) => [...prev, { id, message, variant, visible: false }]);

      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          setItems((prev) =>
            prev.map((t) => (t.id === id ? { ...t, visible: true } : t)),
          ),
        ),
      );

      setTimeout(() => {
        setItems((prev) =>
          prev.map((t) => (t.id === id ? { ...t, visible: false } : t)),
        );
        setTimeout(
          () => setItems((prev) => prev.filter((t) => t.id !== id)),
          EXIT_MS,
        );
      }, DURATION);
    }

    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      data-testid="toast-container"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column-reverse",
        gap: "8px",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          data-testid="toast-notification"
          data-variant={item.variant}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            borderLeft: `4px solid ${accent[item.variant]}`,
            fontSize: "14px",
            fontWeight: 600,
            color: "#111827",
            opacity: item.visible ? 1 : 0,
            transform: item.visible ? "translateY(0)" : "translateY(10px)",
            transition: `opacity ${EXIT_MS}ms ease, transform ${EXIT_MS}ms ease`,
            pointerEvents: "auto",
            whiteSpace: "nowrap",
            maxWidth: "calc(100vw - 48px)",
          }}
        >
          <span style={{ color: accent[item.variant], fontWeight: 700 }}>
            {icon[item.variant]}
          </span>
          {item.message}
        </div>
      ))}
    </div>
  );
}
