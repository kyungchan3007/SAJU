export type HttpStatusGroup = {
  status: number;
  requests: number;
};

export type StatusCategory = "2xx" | "3xx" | "4xx" | "5xx" | "other";
