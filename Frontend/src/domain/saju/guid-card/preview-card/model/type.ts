export type WeakElement = "wood" | "fire" | "earth" | "metal" | "water";

export interface FiveElements {
  목: number;
  화: number;
  토: number;
  금: number;
  수: number;
}

export interface DailySajuResult {
  targetDate: string;
  todayScore: number;
  weakElement: WeakElement;
  goodTime: string;
  mood: string;
  dailyMessage: string;
  fiveElements: FiveElements;
  goodActions: string[];
  avoidFlows: string[];
  recommendPlaces: string[];
}

export interface SajuPreviewCardProps {
  dailyResult?: DailySajuResult | null;
}
