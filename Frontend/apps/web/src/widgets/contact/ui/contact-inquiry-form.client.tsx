"use client";

import Link from "next/link";
import type { Route } from "next";

import { InquiryForm, useInquiryForm } from "@/features/inquiry";
import { useLoginRequiredRedirect } from "../hooks/use-login-required-redirect";

const loginRequiredRedirectPath = "/login?next=/contact/form" as Route;

export function ContactInquiryFormClient() {
  const { formData, state, fieldErrors, handlers, resetForm } = useInquiryForm();

  useLoginRequiredRedirect({
    enabled: state.status === "error" && state.code === "LOGIN_REQUIRED",
    loginPath: loginRequiredRedirectPath,
  });

  return (
    <div className="flex flex-col gap-6">
      <InquiryForm
        formData={formData}
        state={state}
        fieldErrors={fieldErrors}
        onTitleChange={handlers.handleTitleChange}
        onEmailChange={handlers.handleEmailChange}
        onContentChange={handlers.handleContentChange}
        onSubmit={handlers.handleSubmit}
        onReset={resetForm}
      />

      <Link
        href="/contact"
        className="text-sm text-saju-primary underline underline-offset-2 hover:text-saju-primary/80"
      >
        문의하기 페이지로 돌아가기
      </Link>
    </div>
  );
}
