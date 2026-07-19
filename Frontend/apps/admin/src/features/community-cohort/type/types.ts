// generated/ 붙기 전까지 임시 타입 정의
// openapi-ts 연동 후 generated/api 에서 import 하도록 교체 예정

export type CommunityCohortStatus = {
  cohortId?: number;
  name?: string;
  capacity?: number;
  currentCount?: number;
  expiredAt?: string;
  location?: string | null;
  cohortStatus?: "OPEN" | "FINALIZED" | "CLOSED";
};

export type CommunityCohortCreateRequest = {
  name: string;
  capacity: number;
  expiredAt: string;
  location?: string | null;
  maleFeeAmount: number;
  femaleFeeAmount: number;
  bankName: string;
  bankAccountNumber: string;
  bankAccountHolder: string;
  finalizationDate?: string | null;
};

export type CommunityCohortCreateResponse = {
  cohortId?: number;
  name?: string;
  capacity?: number;
  createdAt?: string;
  expiredAt?: string | null;
};
