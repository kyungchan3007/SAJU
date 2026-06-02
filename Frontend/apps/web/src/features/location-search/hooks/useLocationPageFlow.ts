"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import type { LocationSearchPlace } from "@/entities/location";
import { useCurrentLocation } from "@/features/location-search/hooks/useCurrentLocation";
import { useLocationKeywords } from "@/features/location-search/hooks/useLocationKeywords";
import { useLocationSearch } from "@/features/location-search/hooks/useLocationSearch";
import { LOCATION_PLACES_PER_PAGE } from "@/features/location-search/model/locationConstants";
import {
  createClosedPlaceLocationParams,
  createKeywordLocationParams,
  createSelectedPlaceLocationParams,
  findSelectedPlaceFromParams,
  getLocationGroupFromParams,
} from "@/features/location-search/model/locationQuery";

const EMPTY_LOCATION_PLACES: LocationSearchPlace[] = [];
const EMPTY_KEYWORDS: string[] = [];

export function useLocationPageFlow() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlace, setSelectedPlace] =
    useState<LocationSearchPlace | null>(null);
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);

  const {
    data: recommendation,
    isLoading: keywordsLoading,
    isError: keywordsError,
  } = useLocationKeywords();
  const keywords = recommendation?.keywords ?? EMPTY_KEYWORDS;
  const { coordinate: currentLocation, isLoading: currentLocationLoading } =
    useCurrentLocation();

  const groupFromUrl = getLocationGroupFromParams(searchParams);
  const effectiveSelectedKeyword = groupFromUrl ?? keywords[0] ?? null;

  const {
    data: searchResult,
    isLoading: placesLoading,
    isError: placesError,
  } = useLocationSearch(
    effectiveSelectedKeyword,
    currentLocation,
    !currentLocationLoading,
  );

  const places = searchResult?.places ?? EMPTY_LOCATION_PLACES;
  const selectedPlaceFromUrl = useMemo(
    () =>
      findSelectedPlaceFromParams({
        effectiveSelectedKeyword,
        groupFromUrl,
        places,
        searchParams,
      }),
    [effectiveSelectedKeyword, groupFromUrl, places, searchParams],
  );
  const effectiveSelectedPlace = selectedPlace ?? selectedPlaceFromUrl;

  const replaceLocationQuery = useCallback(
    (nextParams: URLSearchParams) => {
      const queryString = nextParams.toString();
      const href = (
        queryString ? `${pathname}?${queryString}` : pathname
      ) as Parameters<typeof router.replace>[0];

      router.replace(href, { scroll: false });
    },
    [pathname, router],
  );

  const handleSelectKeyword = useCallback(
    (keyword: string) => {
      setSelectedPlace(null);
      setCurrentPlaceIndex(0);
      replaceLocationQuery(createKeywordLocationParams(keyword));
    },
    [replaceLocationQuery],
  );

  const handleClosePlace = useCallback(() => {
    setSelectedPlace(null);
    replaceLocationQuery(createClosedPlaceLocationParams(searchParams));
  }, [replaceLocationQuery, searchParams]);

  const handleSelectPlace = useCallback(
    (place: LocationSearchPlace) => {
      setSelectedPlace(place);
      const placeIndex = places.findIndex((candidate) => candidate.id === place.id);

      if (placeIndex >= 0) {
        setCurrentPlaceIndex(
          Math.floor(placeIndex / LOCATION_PLACES_PER_PAGE) *
            LOCATION_PLACES_PER_PAGE,
        );
      }

      replaceLocationQuery(
        createSelectedPlaceLocationParams({
          effectiveSelectedKeyword,
          place,
          searchParams,
        }),
      );
    },
    [effectiveSelectedKeyword, places, replaceLocationQuery, searchParams],
  );

  const handleChangePlaceIndex = useCallback(
    (index: number) => {
      const nextPlace = places[index];

      if (!nextPlace) {
        return;
      }

      setCurrentPlaceIndex(index);
      handleSelectPlace(nextPlace);
    },
    [handleSelectPlace, places],
  );

  return {
    currentLocation,
    currentPlaceIndex,
    keywords,
    keywordsError,
    keywordsLoading,
    onChangePlaceIndex: handleChangePlaceIndex,
    onClosePlace: handleClosePlace,
    onSelectKeyword: handleSelectKeyword,
    onSelectPlace: handleSelectPlace,
    places,
    placesError,
    placesLoading: currentLocationLoading || placesLoading,
    recommendation,
    selectedKeyword: effectiveSelectedKeyword,
    selectedPlace: effectiveSelectedPlace,
  };
}
