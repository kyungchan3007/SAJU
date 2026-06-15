"use client";

import { useSajuResultQuery } from "@/features/saju-result/hooks/useSajuResultQuery";

export function useCompatibilityDaily() {
  return useSajuResultQuery("/compatibility");
}
