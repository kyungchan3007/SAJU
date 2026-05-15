export type SajuManageSelectedTarget = "me" | number;

export type PendingNewPartner = {
  name: string;
};

export type PartnerDeleteTarget = {
  id: number;
  name: string;
};

export function createTemporaryPartnerTarget(): number {
  return -Date.now();
}
