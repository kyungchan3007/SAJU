"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { useAuthHooks } from "@/features/auth/hooks/useAuthHooks";

type LoginPanelContentProps = {
  kakaoLoginUrl: string;
};

export function LoginPanelContent({ kakaoLoginUrl }: LoginPanelContentProps) {
  const {
    viewMode,
    handleEmailLogin,
    email,
    handleBack,
    password,
    error,
    isLoading,
    setViewMode,
    setEmail,
    setPassword,
    isFormValid,
  } = useAuthHooks();

  return (
    <AnimatePresence mode="wait">
      {viewMode === "default" ? (
        <motion.div
          key="default"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">
            Sign In
          </p>

          <h1 className="text-[clamp(32px,4.3vw,52px)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            오늘의 기운을
            <br />
            열어보는 입구
          </h1>

          <p className="mt-4 max-w-[480px] text-[17px] leading-[1.75] text-white/50">
            밤하늘 무드와 초승달 이미지를 중심으로 진입 감도를 높이고, 첫 행동은
            단순하게 유지합니다.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={kakaoLoginUrl}
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl px-5 font-extrabold text-[#170d03] transition hover:brightness-110"
              style={{
                background:
                  "linear-gradient(135deg, #f9dfa4 0%, #dfab4e 55%, #86561b 100%)",
                boxShadow: "0 18px 34px rgba(216,161,66,.28)",
              }}
            >
              카카오로 3초 시작
            </a>
            <button
              type="button"
              onClick={() => setViewMode("email")}
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 font-extrabold text-white/80 transition hover:bg-white/[0.06]"
            >
              이메일 로그인
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3.5">
            {[
              { value: "1분", label: "첫 설정 완료" },
              { value: "3단계", label: "입력 후 추천 확인" },
              { value: "즉시", label: "홈으로 이동" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-[20px] border border-white/[0.06] bg-white/[0.03] p-4"
              >
                <strong className="block text-[28px] font-semibold leading-none tracking-[-0.04em] text-white">
                  {value}
                </strong>
                <span className="mt-1 block text-sm text-white/40">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="email"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <button
            type="button"
            onClick={handleBack}
            className="mb-5 flex items-center gap-1.5 text-sm text-white/40 transition hover:text-white/70"
          >
            ← 돌아가기
          </button>

          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">
            Sign In
          </p>
          <h2 className="mb-6 text-2xl font-semibold tracking-[-0.04em] text-white">
            이메일 로그인
          </h2>

          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white/60"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                autoComplete="email"
                className={cn(
                  "h-12 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/20",
                  "outline-none transition",
                  "focus:border-white/20 focus:ring-2 focus:ring-white/[0.08]",
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white/60"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8~20자 입력"
                autoComplete="current-password"
                className={cn(
                  "h-12 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/20",
                  "outline-none transition",
                  "focus:border-white/20 focus:ring-2 focus:ring-white/[0.08]",
                )}
              />
            </div>

            <div className="min-h-[20px]">
              {error && <p className="text-sm text-red-400">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={cn(
                "inline-flex min-h-[48px] items-center justify-center rounded-2xl px-5 font-extrabold transition",
                isFormValid && !isLoading
                  ? "text-[#170d03] hover:brightness-110"
                  : "cursor-not-allowed bg-white/[0.06] text-white/30 opacity-50",
              )}
              style={
                isFormValid && !isLoading
                  ? {
                      background:
                        "linear-gradient(135deg, #f9dfa4 0%, #dfab4e 55%, #86561b 100%)",
                      boxShadow: "0 18px 34px rgba(216,161,66,.28)",
                    }
                  : undefined
              }
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
