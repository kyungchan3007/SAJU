"use client";

import { useEffect, useState } from "react";

import type { LocationCoordinate } from "@/entities/location";

type CurrentLocationState = {
  coordinate: LocationCoordinate | null;
  isLoading: boolean;
  isDenied: boolean;
};

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 5 * 60 * 1000,
  timeout: 8000,
};

export function useCurrentLocation(): CurrentLocationState {
  const [state, setState] = useState<CurrentLocationState>({
    coordinate: null,
    isLoading: true,
    isDenied: false,
  });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      queueMicrotask(() => {
        setState({ coordinate: null, isLoading: false, isDenied: true });
      });
      return;
    }

    let isMounted = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!isMounted) {
          return;
        }

        setState({
          coordinate: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          isLoading: false,
          isDenied: false,
        });
      },
      () => {
        if (!isMounted) {
          return;
        }

        setState({ coordinate: null, isLoading: false, isDenied: true });
      },
      GEOLOCATION_OPTIONS,
    );

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
