import { useState } from "react";

export const useAuthHooks = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isFormValid = email.length > 0 && password.length >= 8;

  function handleBack() {
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
    email,
    password,
    error,
    isLoading,
    handleBack,
    handleEmailLogin,
    setEmail,
    setPassword,
    isFormValid,
  };
};
