"use client";

import type { ReactNode } from "react";
import { CheckCircle, Circle, Loader2 } from "lucide-react";

import type { AdProgressNoteState } from "@/shared/hooks/use-ad-progress-gate";

type Props = {
  state: AdProgressNoteState;
  children: ReactNode;
};

export function AdProgressNote({ state, children }: Props) {
  const styles: Record<
    AdProgressNoteState,
    { bg: string; border: string; color: string }
  > = {
    pending: { bg: "#fff", border: "#F3F4F6", color: "#374151" },
    active: { bg: "#F0EEFF", border: "#C7C4F8", color: "#5956E9" },
    done: { bg: "#F0FDF4", border: "#BBF7D0", color: "#166534" },
  };
  const style = styles[state];

  return (
    <div
      className="flex items-start gap-2.5 rounded-[14px] border px-4 py-3 text-[13px] font-semibold transition-all duration-300"
      style={{
        background: style.bg,
        borderColor: style.border,
        color: style.color,
      }}
    >
      {state === "done" ? (
        <CheckCircle
          size={16}
          className="mt-px shrink-0"
          style={{ color: "#16A34A" }}
        />
      ) : null}
      {state === "active" ? (
        <Loader2
          size={16}
          className="mt-px shrink-0 animate-spin"
          style={{ color: "#5956E9" }}
        />
      ) : null}
      {state === "pending" ? (
        <Circle
          size={16}
          className="mt-px shrink-0"
          style={{ color: "#D1D5DB" }}
        />
      ) : null}
      <span>{children}</span>
    </div>
  );
}
