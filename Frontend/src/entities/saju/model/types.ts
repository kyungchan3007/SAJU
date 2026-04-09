export type SajuInput = {
  name: string;
  birthDate: string;
  birthTime?: string;
  calendarType: "solar" | "lunar";
  gender?: "male" | "female" | "unknown";
};

export type SajuProfile = {
  ownerName: string;
  pillars: string[];
  summary: string;
  guidance: string[];
};
