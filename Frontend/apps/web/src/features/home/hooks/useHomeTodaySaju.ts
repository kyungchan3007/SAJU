"use client";

import { useSajuResultQuery } from "@/features/saju-result/hooks/useSajuResultQuery";

export function useHomeTodaySaju() {
  return useSajuResultQuery("/home");
}
