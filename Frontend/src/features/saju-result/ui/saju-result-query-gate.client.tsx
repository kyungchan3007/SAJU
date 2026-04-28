"use client";

import type { PropsWithChildren } from "react";

import { useSajuResultGate } from "@/features/saju-result/hooks/useSajuResultGate";

export function SajuResultQueryGate({ children }: PropsWithChildren) {
  const { isLoading, errorMessage } = useSajuResultGate();

  if (isLoading) {
    return (
      <div className="card-saju-primary p-6 text-sm text-black/60">
        사주 결과를 불러오는 중입니다.
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="card-saju-primary p-6 text-sm text-red-600">
        {errorMessage}
      </div>
    );
  }

  return <>{children}</>;
}
