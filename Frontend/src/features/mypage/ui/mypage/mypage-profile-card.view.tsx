type Props = {
  email: string;
  zodiacEmoji?: string | null;
  isCommunityJoined: boolean;
};

export function MypageProfileCardView({
  email,
  zodiacEmoji,
  isCommunityJoined,
}: Props) {
  return (
    <section className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
      <div className="relative mb-4">
        <div
          className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-slate-50 bg-[#1a1a1a] text-5xl"
          style={{ boxShadow: "0 0 0 2px rgba(89,86,233,0.10)" }}
        >
          {zodiacEmoji ? <span>{zodiacEmoji}</span> : <span>👤</span>}
        </div>
      </div>

      <h2 className="mb-1 text-xl font-bold text-slate-800">회원</h2>
      <p className="text-sm text-slate-400">{email}</p>
      {isCommunityJoined && (
        <span className="mt-2 inline-flex items-center rounded-full bg-[#F0EEFF] px-3 py-1 text-[11px] font-bold text-[#5956E9]">
          커뮤니티 참가 중
        </span>
      )}

      <a
        href="/mypage/jeongtongsaju"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
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
