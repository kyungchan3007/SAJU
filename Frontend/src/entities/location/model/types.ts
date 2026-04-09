export type LocationRecommendation = {
  id: string;
  title: string;
  category: string;
  description: string;
  latitude: number;
  longitude: number;
};

export type MapViewport = {
  lat: number;
  lng: number;
  level: number;
};
