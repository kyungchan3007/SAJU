import Image from "next/image";

export function CommunityHero() {
  return (
    <div className="relative overflow-hidden rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
      <div className="relative h-[368px] w-full">
        <Image
          src="/image/community/group.png"
          alt="커뮤니티 히어로"
          fill
          sizes="(max-width: 768px) 100vw, 860px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/52 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex max-w-[560px] flex-col justify-center px-6 py-8 sm:px-12 sm:py-12">
          <span className="mb-4 inline-block w-fit rounded-full bg-white/90 px-4 py-1 text-[11px] font-bold text-[#5956E9]">
            커뮤니티
          </span>
          <h1 className="mb-3 text-[28px] font-black leading-snug tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
            나와 비슷한 기운의
            <br />
            <span className="text-[#C7C4F8]">사람들과 연결되어보세요</span>
          </h1>
          <p className="text-[15px] font-bold leading-relaxed text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.55),0_1px_4px_rgba(0,0,0,0.40)]">
            오행별 단체방부터 소셜 모임, 취향 모임까지
            <br />
            다양한 커뮤니티로 함께해요.
          </p>
        </div>
      </div>
    </div>
  );
}
