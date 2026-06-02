export type CompatibilityPreview = {
  score: number;
  summary: string;
  strengths: string[];
  locked: boolean;
};

export type CompatibilityDetail = CompatibilityPreview & {
  detailedAnalysis: string[];
  recommendedActions: string[];
};
