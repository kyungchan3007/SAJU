import Image from "next/image";

export function MypageBanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ borderRadius: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
    >
      {/* 배경 이미지 */}
      <Image
        src="/mypage/man_woman_w.png"
        alt="커뮤니티 배너"
        width={900}
        height={400}
        className="block h-full w-full object-cover"
        priority
      />

      {/* 텍스트 오버레이 */}
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ padding: "40px 48px" }}
      >
        <span
          className="mb-4 w-fit rounded-full px-3 py-1 text-[11px] font-bold"
          style={{ background: "rgba(255,255,255,0.85)", color: "#5956E9" }}
        >
          커뮤니티
        </span>
        <h2
          className="mb-3 text-[26px] font-black leading-snug tracking-tight text-white"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.40)" }}
        >
          나와 맞는 사주의
          <br />
          친구를 만나보세요
        </h2>
        <p
          className="mb-6 text-[15px] font-bold leading-relaxed text-white"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.60), 0 1px 4px rgba(0,0,0,0.50)" }}
        >
          궁합 맞는 친구·연인,
          <br />
          사주가 찾아드립니다!
        </p>
        <a
          href="/community"
          className="flex w-fit items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold text-[#5956E9] transition hover:opacity-90"
          style={{ background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
        >
          커뮤니티 바로가기
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
