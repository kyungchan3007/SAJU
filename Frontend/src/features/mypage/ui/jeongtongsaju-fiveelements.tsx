import type { FiveElementsBalance } from "@/shared/model/five-elements/model";
import { FiveElementsBalanceCard } from "@/shared/ui/five-elements-balance/five-elements-balance";

export type FiveElements = FiveElementsBalance;

type Props = { fiveElements: FiveElements };

export function JeongtongsajuFiveElements({ fiveElements }: Props) {
  return <FiveElementsBalanceCard fiveElements={fiveElements} />;
}
