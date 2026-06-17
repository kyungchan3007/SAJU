import type { CommunityCohortStatus } from "../type/types";

export function isCohortFull(cohort: CommunityCohortStatus): boolean {
  return cohort.currentCount >= cohort.capacity;
}

export function isCohortExpired(cohort: CommunityCohortStatus): boolean {
  if (!cohort.expiredAt) return false;
  return new Date(cohort.expiredAt) < new Date();
}
