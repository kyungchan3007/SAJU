"use client";

import { useEffect, useState } from "react";

import { useLocationPageFlow } from "@/features/location-search/hooks/useLocationPageFlow";
import { LocationPageHydrationFallback } from "@/features/location-search/ui/location-page-hydration-fallback";
import { LocationSearchPanel } from "@/features/location-search/ui/location-search-panel";
import { LocationMapPanel } from "@/widgets/location-map";

export function LocationPageContainer() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setIsMounted(true);
    });
  }, []);

  if (!isMounted) {
    return <LocationPageHydrationFallback />;
  }

  return <LocationPageContent />;
}

function LocationPageContent() {
  const locationPage = useLocationPageFlow();

  return (
    <div className="grid gap-5 lg:h-[calc(100dvh-132px)] lg:min-h-0 lg:grid-cols-[360px_1fr] lg:items-stretch">
      <LocationSearchPanel
        keywords={locationPage.keywords}
        strongestElement={locationPage.recommendation?.strongestElement}
        strongestScore={locationPage.recommendation?.strongestScore}
        keywordsLoading={locationPage.keywordsLoading}
        keywordsError={locationPage.keywordsError}
        selectedKeyword={locationPage.selectedKeyword}
        onSelectKeyword={locationPage.onSelectKeyword}
        places={locationPage.places}
        placesLoading={locationPage.placesLoading}
        placesError={locationPage.placesError}
        selectedPlace={locationPage.selectedPlace}
        currentPlaceIndex={locationPage.currentPlaceIndex}
        onChangePlaceIndex={locationPage.onChangePlaceIndex}
        onSelectPlace={locationPage.onSelectPlace}
      />
      <LocationMapPanel
        places={locationPage.places}
        currentLocation={locationPage.currentLocation}
        selectedKeyword={locationPage.selectedKeyword}
        selectedPlace={locationPage.selectedPlace}
        onSelectPlace={locationPage.onSelectPlace}
        onClosePlace={locationPage.onClosePlace}
      />
    </div>
  );
}
