"use client";

import { useCallback, useState } from "react";
import { validateInquiryForm } from "../model/validation";
import { INQUIRY_FORM_LIMITS, type InquiryFormData, type InquiryFormState, type InquiryErrorCode } from "../types";

export function useInquiryForm() {
  const [formData, setFormData] = useState<InquiryFormData>({
    title: "",
    contactEmail: "",
    content: "",
  });

  const [state, setState] = useState<InquiryFormState>({ status: "idle" });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof InquiryFormData, string>>
  >({});

  const handleTitleChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, title: value }));
    // Clear error on change
    setFieldErrors((prev) => ({ ...prev, title: undefined }));
  }, []);

  const handleEmailChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, contactEmail: value }));
    setFieldErrors((prev) => ({ ...prev, contactEmail: undefined }));
  }, []);

  const handleContentChange = useCallback((value: string) => {
    if (value.length <= INQUIRY_FORM_LIMITS.content.max) {
      setFormData((prev) => ({ ...prev, content: value }));
      setFieldErrors((prev) => ({ ...prev, content: undefined }));
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = validateInquiryForm(formData);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      return;
    }

    setState({ status: "loading" });
    setFieldErrors({});

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorCode = errorData.code || "SERVER_ERROR";
        const errorMessage = getErrorMessage(response.status, errorCode);

        setState({
          status: "error",
          code: errorCode,
          message: errorMessage,
        });
        return;
      }

      setState({ status: "success" });
      setFormData({
        title: "",
        contactEmail: "",
        content: "",
      });
    } catch (error) {
      setState({
        status: "error",
        code: "SERVER_ERROR",
        message: "요청을 보낼 수 없습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      contactEmail: "",
      content: "",
    });
    setState({ status: "idle" });
    setFieldErrors({});
  }, []);

  return {
    formData,
    state,
    fieldErrors,
    handlers: {
      handleTitleChange,
      handleEmailChange,
      handleContentChange,
      handleSubmit,
    },
    resetForm,
  };
}

function getErrorMessage(status: number, code: string): string {
  if (status === 401 || code === "LOGIN_REQUIRED") {
    return "로그인이 필요합니다. 다시 로그인해주세요.";
  }
  if (status === 400 || code === "INVALID_INPUT") {
    return "입력값을 다시 확인해주세요.";
  }
  if (status === 403 || code === "UNAUTHORIZED") {
    return "페이지를 새로고침한 후 다시 시도해주세요.";
  }
  return "요청을 처리할 수 없습니다. 잠시 후 다시 시도해주세요.";
}
