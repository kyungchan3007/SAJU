"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSajuProfileOnClient } from "@/entities/saju/client/fetchSajuProfileOnClient";

const SAJU_CONSENT_STATUS_QUERY_KEY = ["saju", "consent-status"] as const;

export function useSajuConsentStatus() {
  const query = useQuery({
    queryKey: SAJU_CONSENT_STATUS_QUERY_KEY,
    queryFn: async () => {
      try {
        const result = await fetchSajuProfileOnClient();
        return result.data?.consentGiven === true;
      } catch {
        return false;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });

  return {
    isConsentAlreadyGiven: query.data === true,
  };
}
