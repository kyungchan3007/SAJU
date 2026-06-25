import { describe, it, expect } from "vitest";
import {
  validateTitle,
  validateEmail,
  validateContent,
  validateInquiryForm,
} from "../model/validation";

describe("validation", () => {
  describe("validateTitle", () => {
    it("should reject empty title", () => {
      const result = validateTitle("");
      expect(result.valid).toBe(false);
      expect(result.error).toBe("제목을 입력해주세요");
    });

    it("should reject whitespace-only title", () => {
      const result = validateTitle("   ");
      expect(result.valid).toBe(false);
    });

    it("should accept valid title", () => {
      const result = validateTitle("계정 로그인 문제");
      expect(result.valid).toBe(true);
    });

    it("should reject title exceeding max length", () => {
      const longTitle = "a".repeat(101);
      const result = validateTitle(longTitle);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("100자");
    });

    it("should accept title at max length", () => {
      const maxTitle = "a".repeat(100);
      const result = validateTitle(maxTitle);
      expect(result.valid).toBe(true);
    });
  });

  describe("validateEmail", () => {
    it("should reject empty email", () => {
      const result = validateEmail("");
      expect(result.valid).toBe(false);
      expect(result.error).toBe("이메일을 입력해주세요");
    });

    it("should reject invalid email format", () => {
      const result = validateEmail("not-an-email");
      expect(result.valid).toBe(false);
      expect(result.error).toContain("올바른 이메일");
    });

    it("should accept valid email", () => {
      const result = validateEmail("test@example.com");
      expect(result.valid).toBe(true);
    });

    it("should accept email with subdomain", () => {
      const result = validateEmail("user@mail.example.co.kr");
      expect(result.valid).toBe(true);
    });
  });

  describe("validateContent", () => {
    it("should reject empty content", () => {
      const result = validateContent("");
      expect(result.valid).toBe(false);
      expect(result.error).toBe("문의 내용을 입력해주세요");
    });

    it("should accept valid content", () => {
      const result = validateContent("This is a test inquiry content.");
      expect(result.valid).toBe(true);
    });

    it("should reject content exceeding max length", () => {
      const longContent = "a".repeat(2001);
      const result = validateContent(longContent);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("2000자");
    });

    it("should accept content at max length", () => {
      const maxContent = "a".repeat(2000);
      const result = validateContent(maxContent);
      expect(result.valid).toBe(true);
    });
  });

  describe("validateInquiryForm", () => {
    it("should validate all fields together", () => {
      const result = validateInquiryForm({
        title: "Test Title",
        contactEmail: "test@example.com",
        content: "Test content",
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it("should collect multiple errors", () => {
      const result = validateInquiryForm({
        title: "",
        contactEmail: "invalid-email",
        content: "",
      });
      expect(result.valid).toBe(false);
      expect(result.errors.title).toBeDefined();
      expect(result.errors.contactEmail).toBeDefined();
      expect(result.errors.content).toBeDefined();
    });

    it("should allow partial errors", () => {
      const result = validateInquiryForm({
        title: "Valid Title",
        contactEmail: "",
        content: "Valid content",
      });
      expect(result.valid).toBe(false);
      expect(result.errors.title).toBeUndefined();
      expect(result.errors.contactEmail).toBeDefined();
      expect(result.errors.content).toBeUndefined();
    });
  });
});
