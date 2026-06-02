"use client";

import { useQuery } from "@tanstack/react-query";

import type {
  LocationCoordinate,
  LocationSearchResponse,
} from "@/entities/location";
import { LOCATION_SEARCH_ENDPOINT_PATH } from "@/shared/config/endPoint";

async function fetchLocationSearch(
  keyword: string,
  currentLocation: LocationCoordinate | null,
): Promise<LocationSearchResponse> {
  const url = new URL(
    LOCATION_SEARCH_ENDPOINT_PATH,
    typeof window !== "undefined" ? window.location.origin : "http://localhost",
  );
  url.searchParams.set("query", keyword);

  if (currentLocation) {
    url.searchParams.set("x", String(currentLocation.longitude));
    url.searchParams.set("y", String(currentLocation.latitude));
    url.searchParams.set("sort", "distance");
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("장소 검색에 실패했습니다.");

  const json: {
    success: boolean;
    data: LocationSearchResponse | null;
    error: { code: string; message: string } | null;
  } = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error?.message ?? "장소 검색에 실패했습니다.");
  }

  return json.data;
}

export function useLocationSearch(
  selectedKeyword: string | null,
  currentLocation: LocationCoordinate | null,
  enabled = true,
) {
  return useQuery({
    queryKey: [
      "location",
      "search",
      selectedKeyword,
      currentLocation?.latitude ?? null,
      currentLocation?.longitude ?? null,
    ],
    queryFn: () => fetchLocationSearch(selectedKeyword!, currentLocation),
    enabled: enabled && !!selectedKeyword,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
}
