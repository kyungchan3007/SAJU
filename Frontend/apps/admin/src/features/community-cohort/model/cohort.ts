import type { CommunityCohortStatus } from "../type/types";

export function isCohortFull(cohort: CommunityCohortStatus): boolean {
  if (typeof cohort.currentCount !== "number" || typeof cohort.capacity !== "number") {
    return false;
  }

  return cohort.currentCount >= cohort.capacity;
}

export function isCohortExpired(cohort: CommunityCohortStatus): boolean {
  if (!cohort.expiredAt) return false;
  return new Date(cohort.expiredAt) < new Date();
}
