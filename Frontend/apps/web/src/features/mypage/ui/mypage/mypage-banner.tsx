import Image from "next/image";

export function MypageBanner() {
  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ borderRadius: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
      >
        <Image
          src="/mypage/man_woman_w.webp"
          alt="커뮤니티 배너"
          width={900}
          height={400}
          priority
        />

        <div
          className="pointer-events-none absolute bottom-0 left-0 top-0 w-[90%] rounded-2xl xs:w-[82%] md:w-[56%]"
          style={{
            background:
              "radial-gradient(90% 120% at 0% 50%, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.26) 45%, rgba(0,0,0,0.10) 72%, rgba(0,0,0,0) 100%)",
            filter: "blur(1px)",
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-center px-4 xs:px-5 md:px-12 md:py-6">
          <h2
            className="mb-2 text-[15px] font-black leading-snug tracking-tight text-white xs:text-[17px] md:mb-3 md:text-[26px]"
            style={{
              textShadow:
                "0 2px 12px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.40)",
            }}
          >
            나와 맞는 사주로
            <br />
            친구를 만나보세요
          </h2>
          <p
            className="text-[12px] font-bold leading-relaxed text-white md:mb-3 md:text-[15px]"
            style={{
              textShadow:
                "0 2px 10px rgba(0,0,0,0.60), 0 1px 4px rgba(0,0,0,0.50)",
            }}
          >
            궁합 맞는 친구와 연인,
            <br />
            사주가 찾아드립니다!
          </p>

          <a
            href="/community"
            className="hidden w-fit items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-[#5956E9] transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5956E9]/70 focus-visible:ring-offset-2 md:flex"
            style={{
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
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

      <div className="flex justify-center px-4 md:hidden">
        <a
          href="/community"
          className="flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[11px] font-bold text-[#5956E9] transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5956E9]/70 focus-visible:ring-offset-2 xs:px-5 xs:py-3 xs:text-[12px]"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
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
    </>
  );
}
