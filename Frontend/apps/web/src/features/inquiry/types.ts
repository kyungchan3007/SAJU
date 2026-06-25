export const INQUIRY_FORM_LIMITS = {
  title: {
    min: 1,
    max: 100,
  },
  content: {
    min: 1,
    max: 2000,
  },
} as const;

export type InquiryFormData = {
  title: string;
  contactEmail: string;
  content: string;
};

export type InquiryFormState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; code: string; message: string };

export type InquiryErrorCode =
  | "LOGIN_REQUIRED"
  | "INVALID_INPUT"
  | "UNAUTHORIZED"
  | "SERVER_ERROR";
