"use client";

import type { ApiEnvelope } from "@/shared/api";
import {
  SAJU_AUTH_LOGOUT_PATH,
  SAJU_USERS_ME_PATH,
} from "@/shared/config/endPoint";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type AccountModalType = "logout" | "withdraw" | null;

export function useAccountActions() {
  const router = useRouter();
  const [modalType, setModalType] = useState<AccountModalType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openModal = (type: Exclude<AccountModalType, null>) => {
    setErrorMessage(null);
    setModalType(type);
  };

  const closeModal = () => {
    setErrorMessage(null);
    setModalType(null);
  };

  const confirm = async () => {
    if (!modalType || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const isLogout = modalType === "logout";
    const endpoint = isLogout ? SAJU_AUTH_LOGOUT_PATH : SAJU_USERS_ME_PATH;
    const method = isLogout ? "POST" : "DELETE";

    try {
      const response = await fetch(endpoint, {
        method,
      });

      if (!response.ok) {
        const fallbackMessage = isLogout
          ? "로그아웃에 실패했습니다."
          : "회원탈퇴에 실패했습니다.";

        let message = fallbackMessage;

        try {
          const result = (await response.json()) as ApiEnvelope<unknown>;
          if (!result.success) {
            message = result.error.message || fallbackMessage;
          }
        } catch {
          message = fallbackMessage;
        }

        setErrorMessage(message);
        return;
      }

      closeModal();
      router.replace(isLogout ? "/login" : "/login?withdraw=1");
      router.refresh();
    } catch {
      setErrorMessage(
        isLogout ? "로그아웃에 실패했습니다." : "회원탈퇴에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    modalType,
    isSubmitting,
    errorMessage,
    openModal,
    closeModal,
    confirm,
  };
}
