import Image from "next/image";

export function TarotCommunityMarketingSection() {
  return (
    <section className="overflow-hidden border-t border-[#E8E4F8] bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1fr_420px]">

          {/* 좌: 텍스트 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-bold" style={{ color: "#5956E9" }}>05</div>
              <div className="text-xs text-gray-400">다양한 콘텐츠로 더 풍성하게</div>
              <h2 className="text-3xl font-black leading-snug text-gray-900">
                타로 상담 &<br />커뮤니티
              </h2>
              <p className="text-sm leading-relaxed text-gray-500">
                타로로 현재의 고민을 해결하고,
                <br />
                커뮤니티에서 다양한 사람들과
                <br />
                이야기를 나눠보세요.
              </p>
            </div>

            {/* 타로·커뮤니티 기능 설명 카드 */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🔮", title: "타로 상담", desc: "연애, 고민, 직장, 재물\n지금 필요한 힌트를 얻어보세요." },
                { icon: "💬", title: "커뮤니티", desc: "같은 고민을 가진 사람들과\n이야기하고 공감해요." },
                { icon: "🌙", title: "오늘의 타로", desc: "매일 새로운 타로 카드로\n하루의 흐름을 확인해요." },
                { icon: "🤝", title: "함께 나누기", desc: "사주·운세 경험을 서로\n공유하고 댓글로 소통해요." },
              ].map((card) => (
                <div
                  key={card.title}
                  className="flex items-start gap-3 rounded-xl p-4"
                  style={{ background: "#F8F7FF" }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-lg"
                    style={{ background: "#EEF" }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-bold text-gray-900">{card.title}</div>
                    <div className="text-xs leading-relaxed text-gray-400" style={{ whiteSpace: "pre-line" }}>
                      {card.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 우: 이미지 카드 */}
          <div
            className="relative hidden self-stretch md:flex md:items-center md:justify-center"
            style={{ minHeight: "460px" }}
          >
            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl"
              style={{ width: "360px", height: "440px" }}
            >
              <Image
                src="/image/hero/group.png"
                alt="타로 & 커뮤니티"
                fill
                sizes="360px"
                className="object-cover object-center"
              />
              {/* 하단 보라 그라디언트 */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(89,86,233,0.35) 0%, rgba(89,86,233,0.02) 40%, transparent 100%)",
                }}
              />
              {/* 상단 배지 */}
              <div className="absolute left-1/2 top-5 -translate-x-1/2">
                <div
                  className="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold text-white"
                  style={{
                    background: "rgba(89,86,233,0.8)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  🔮 타로 & 커뮤니티
                </div>
              </div>
              {/* 하단 텍스트 */}
              <div className="absolute bottom-7 left-0 right-0 px-6 text-center">
                <p className="text-sm font-semibold leading-relaxed text-white">
                  고민을 나누고
                  <br />
                  함께 답을 찾아요
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
