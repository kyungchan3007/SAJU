export type SajuInput = {
  name: string;
  birthDate: string;
  birthTime?: string;
  calendarType: "SOLAR" | "LUNAR";
  gender?: "MALE" | "FEMALE" | "unknown";
};

export type SajuProfile = {
  ownerName: string;
  pillars: string[];
  summary: string;
  guidance: string[];
};
