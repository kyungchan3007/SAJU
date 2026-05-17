import type { PlaceRecommendResponse } from "@/generated/api";

export type LocationKeywordsResponse = Omit<PlaceRecommendResponse, "keywords"> & {
  keywords: string[];
};

export type LocationRecommendationKeywords = NonNullable<
  PlaceRecommendResponse["keywords"]
>;

export type LocationSearchSort = "accuracy" | "distance";

export type LocationSearchParams = {
  query: string;
  x?: number;
  y?: number;
  radius?: number;
  page?: number;
  size?: number;
  sort?: LocationSearchSort;
};

export type LocationSearchPlace = {
  id: string;
  name: string;
  categoryName: string;
  addressName: string;
  roadAddressName: string;
  phone: string;
  placeUrl: string;
  longitude: number;
  latitude: number;
  distance?: number;
};

export type LocationCoordinate = {
  latitude: number;
  longitude: number;
};

export type LocationSearchResponse = {
  keyword: string;
  places: LocationSearchPlace[];
  meta: {
    totalCount: number;
    pageableCount: number;
    isEnd: boolean;
  };
};

export type MapViewport = {
  lat: number;
  lng: number;
  level: number;
};
