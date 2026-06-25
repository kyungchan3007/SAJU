"use client";

import Link from "next/link";
import { Button, FormMessage } from "@/shared/ui";
import { INQUIRY_FORM_LIMITS } from "../types";
import type { InquiryFormState } from "../types";

interface InquiryFormProps {
  formData: {
    title: string;
    contactEmail: string;
    content: string;
  };
  state: InquiryFormState;
  fieldErrors: Partial<Record<"title" | "contactEmail" | "content", string>>;
  onTitleChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export function InquiryForm({
  formData,
  state,
  fieldErrors,
  onTitleChange,
  onEmailChange,
  onContentChange,
  onSubmit,
  onReset,
}: InquiryFormProps) {
  const isSubmitting = state.status === "loading";
  const isSuccess = state.status === "success";
  const isError = state.status === "error";

  const isFormValid =
    formData.title.trim() &&
    formData.contactEmail.trim() &&
    formData.content.trim() &&
    !fieldErrors.title &&
    !fieldErrors.contactEmail &&
    !fieldErrors.content;

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-4">
        <FormMessage variant="success">
          문의가 접수되었습니다. 빠른 시일 내에 답변해드리겠습니다.
        </FormMessage>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <Button
            variant="default"
            onClick={onReset}
            className="flex-1"
          >
            새로운 문의 작성
          </Button>
          <Link
            href="/contact"
            className="flex items-center justify-center"
          >
            <Button
              variant="outline"
              className="w-full"
            >
              문의하기 페이지로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5"
    >
      {/* Error message */}
      {isError && state.status === "error" && (
        <FormMessage variant="error">{state.message}</FormMessage>
      )}

      {/* Title field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="text-xs font-bold text-gray-700"
        >
          제목
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="문의 제목을 입력해주세요 (예: 계정 로그인 문제)"
          maxLength={INQUIRY_FORM_LIMITS.title.max}
          disabled={isSubmitting}
          className="h-12 rounded-2xl border border-gray-200 px-4 text-sm placeholder:text-gray-400 focus:border-saju-primary focus:outline-none focus:ring-2 focus:ring-saju-primary/20 disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
        />
        {fieldErrors.title && (
          <p className="text-xs text-red-500">{fieldErrors.title}</p>
        )}
        <p className="text-xs text-gray-500">
          {formData.title.length} / {INQUIRY_FORM_LIMITS.title.max}자
        </p>
      </div>

      {/* Email field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-xs font-bold text-gray-700"
        >
          답변 받을 이메일
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={formData.contactEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="your.email@example.com"
          disabled={isSubmitting}
          className="h-12 rounded-2xl border border-gray-200 px-4 text-sm placeholder:text-gray-400 focus:border-saju-primary focus:outline-none focus:ring-2 focus:ring-saju-primary/20 disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
        />
        {fieldErrors.contactEmail && (
          <p className="text-xs text-red-500">{fieldErrors.contactEmail}</p>
        )}
      </div>

      {/* Content field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="content"
          className="text-xs font-bold text-gray-700"
        >
          문의 내용
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder={`상세한 문의 내용을 입력해주세요.\n\n예시:\n- 어떤 메뉴에서 문제가 발생했나요?\n- 언제 발생했나요?\n- 오류 메시지나 스크린샷을 첨부해주세요.`}
          maxLength={INQUIRY_FORM_LIMITS.content.max}
          disabled={isSubmitting}
          rows={8}
          className="rounded-2xl border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-saju-primary focus:outline-none focus:ring-2 focus:ring-saju-primary/20 disabled:bg-gray-50 disabled:text-gray-400 resize-none transition-colors"
        />
        {fieldErrors.content && (
          <p className="text-xs text-red-500">{fieldErrors.content}</p>
        )}
        <p className="text-xs text-gray-500">
          {formData.content.length} / {INQUIRY_FORM_LIMITS.content.max}자
        </p>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full h-12 mt-2"
      >
        {isSubmitting ? "문의 제출 중..." : "문의 제출"}
      </Button>
    </form>
  );
}
