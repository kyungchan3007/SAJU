import { INQUIRY_FORM_LIMITS } from "../types";

export function validateTitle(title: string): { valid: boolean; error?: string } {
  if (!title.trim()) {
    return { valid: false, error: "제목을 입력해주세요" };
  }
  if (title.length > INQUIRY_FORM_LIMITS.title.max) {
    return { valid: false, error: `제목은 ${INQUIRY_FORM_LIMITS.title.max}자 이하여야 합니다` };
  }
  return { valid: true };
}

export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email.trim()) {
    return { valid: false, error: "이메일을 입력해주세요" };
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "올바른 이메일 형식을 입력해주세요" };
  }
  return { valid: true };
}

export function validateContent(content: string): { valid: boolean; error?: string } {
  if (!content.trim()) {
    return { valid: false, error: "문의 내용을 입력해주세요" };
  }
  if (content.length > INQUIRY_FORM_LIMITS.content.max) {
    return { valid: false, error: `문의 내용은 ${INQUIRY_FORM_LIMITS.content.max}자 이하여야 합니다` };
  }
  return { valid: true };
}

export function validateInquiryForm(data: {
  title: string;
  contactEmail: string;
  content: string;
}): {
  valid: boolean;
  errors: Partial<Record<keyof typeof data, string>>;
} {
  const errors: Partial<Record<keyof typeof data, string>> = {};

  const titleValidation = validateTitle(data.title);
  if (!titleValidation.valid) {
    errors.title = titleValidation.error;
  }

  const emailValidation = validateEmail(data.contactEmail);
  if (!emailValidation.valid) {
    errors.contactEmail = emailValidation.error;
  }

  const contentValidation = validateContent(data.content);
  if (!contentValidation.valid) {
    errors.content = contentValidation.error;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
