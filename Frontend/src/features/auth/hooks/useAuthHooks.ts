import { useState } from "react";
import { ViewMode } from "@/features/auth/type/type";

export const useAuthHooks = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("default");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isFormValid = email.length > 0 && password.length >= 8;

  function handleBack() {
    setViewMode("default");
    setError(null);
    setEmail("");
    setPassword("");
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    setError(null);
    setIsLoading(true);

    try {
      // TODO: 실제 API 연결 위치
      // await signIn("credentials", { email, password, redirect: false });
      // const res = await fetch("/api/auth/email-signin", { method: "POST", body: JSON.stringify({ email, password }) });
    } catch {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    viewMode,
    email,
    password,
    error,
    isLoading,
    handleBack,
    handleEmailLogin,
    setViewMode,
    setEmail,
    setPassword,
    isFormValid,
  };
};
