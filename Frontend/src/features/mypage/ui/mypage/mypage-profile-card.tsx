import { findZodiacByLabel } from "@/shared/model/zodiac/utils";
import type { MypageUser } from "../../type/types";

type Props = { user: MypageUser };

export function MypageProfileCard({ user }: Props) {
  const zodiac = findZodiacByLabel(user.summaryZodiac);

  return (
    <section className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
      {/* 아바타 */}
      <div className="relative mb-4">
        <div
          className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-slate-50 bg-[#1a1a1a] text-5xl"
          style={{ boxShadow: "0 0 0 2px rgba(89,86,233,0.10)" }}
        >
          {zodiac ? <span>{zodiac.emoji}</span> : <span>🐯</span>}
        </div>
        <button
          className="absolute bottom-1 right-1 flex items-center justify-center rounded-full border-2 border-white p-1.5 text-white shadow-md"
          style={{ background: "#5956E9" }}
          aria-label="프로필 수정"
        >
          <svg
            fill="none"
            height="14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="14"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>
      </div>

      {/* 이름/이메일 */}
      <h2 className="mb-1 text-xl font-bold text-slate-800">회원</h2>
      <p className="mb-6 text-sm text-slate-400">{user.email}</p>

      {/* CTA */}
      <a
        href="/mypage/jeongtongsaju"
        className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 px-4 text-sm font-bold text-white transition hover:opacity-90"
        style={{ background: "linear-gradient(to right, #5956E9, #7C3AED)" }}
      >
        정통사주 보기
        <svg
          fill="none"
          height="16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="16"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </a>
    </section>
  );
}
