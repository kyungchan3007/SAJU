"use client";

import { useQuery } from "@tanstack/react-query";

import type { LocationKeywordsResponse } from "@/entities/location";
import { LOCATION_KEYWORDS_ENDPOINT_PATH } from "@/shared/config/endPoint";

async function fetchLocationKeywords(): Promise<LocationKeywordsResponse> {
  const res = await fetch(LOCATION_KEYWORDS_ENDPOINT_PATH);
  if (!res.ok) throw new Error("키워드 조회에 실패했습니다.");
  const json: {
    success: boolean;
    data: LocationKeywordsResponse | null;
    error: { code: string; message: string } | null;
  } = await res.json();
  if (!json.success || !json.data) {
    throw new Error(json.error?.message ?? "키워드 조회에 실패했습니다.");
  }

  return {
    ...json.data,
    keywords: json.data.keywords ?? [],
  };
}

export function useLocationKeywords() {
  return useQuery({
    queryKey: ["location", "keywords"],
    queryFn: fetchLocationKeywords,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
}
