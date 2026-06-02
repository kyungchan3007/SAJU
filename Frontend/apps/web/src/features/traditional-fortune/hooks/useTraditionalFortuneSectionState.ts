import { useState } from "react";
import type {
  DomainDisplay,
  DomainKey,
} from "@/features/traditional-fortune/model/traditionalFortune";

type Params = {
  domains: DomainDisplay[];
};

export function useTraditionalFortuneSectionState({ domains }: Params) {
  const [activeDomain, setActiveDomain] = useState<DomainKey>("wealth");
  const activeDomainData =
    domains.find((d) => d.key === activeDomain) ?? domains[0] ?? null;

  return {
    activeDomain,
    setActiveDomain,
    activeDomainData,
  };
}
