import { PageContainer } from "@/shared/ui/page-container";
import type { ZodiacData, CompatibilityLevel } from "../_data/zodiac-data";

const compatibilityStyle: Record<CompatibilityLevel, string> = {
  최고: "bg-[#F0EEFF] text-[#5956E9]",
  좋음: "bg-[#F0EEFF] text-[#5956E9]",
  보통: "bg-gray-100 text-gray-500",
  주의: "bg-red-50 text-red-500",
};

type ZodiacPageTemplateProps = {
  data: ZodiacData;
};

export function ZodiacPageTemplate({ data }: ZodiacPageTemplateProps) {
  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-8">

          <header className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
              띠별 운세
            </span>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-black tracking-tight text-gray-900">
                {data.emoji} {data.name} 성격과 운세
              </h1>
              <p className="text-sm leading-relaxed text-gray-500">{data.years} · {data.name} 성격, 궁합, 2026년 운세 정리</p>
            </div>
          </header>

          <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
            <p>{data.summary}</p>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
            <h2 className="mb-4 text-lg font-black text-gray-900">성격 장점</h2>
            <div className="flex flex-col gap-3">
              {data.traits.map((t) => (
                <div key={t.label} className="flex gap-3">
                  <span className="mt-0.5 w-fit shrink-0 rounded-full bg-[#F0EEFF] px-2.5 py-0.5 text-xs font-bold text-[#5956E9]">
                    {t.label}
                  </span>
                  <p className="text-sm leading-6 text-gray-600">{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
            <h2 className="mb-4 text-lg font-black text-gray-900">주의할 점</h2>
            <div className="flex flex-col gap-3">
              {data.weaknesses.map((w) => (
                <div key={w.label} className="flex gap-3">
                  <span className="mt-0.5 w-fit shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-500">
                    {w.label}
                  </span>
                  <p className="text-sm leading-6 text-gray-600">{w.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
            <h2 className="mb-4 text-lg font-black text-gray-900">띠별 궁합</h2>
            <div className="grid grid-cols-2 gap-3">
              {data.compatibility.map((c) => (
                <div
                  key={c.zodiac}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3"
                >
                  <span className="text-sm font-semibold text-gray-700">{c.zodiac}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${compatibilityStyle[c.level]}`}>
                    {c.level}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
            <h2 className="mb-4 text-lg font-black text-gray-900">2026년 운세</h2>
            <div className="flex flex-col gap-4">
              {data.fortune2026.map((f) => (
                <div key={f.area} className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-[#5956E9]">{f.area}</h3>
                  <p className="text-sm leading-6 text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[#F0EEFF] px-5 py-6 md:px-7">
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-black text-[#5956E9]">
                나의 사주로 더 정확한 운세를 알고 싶다면?
              </h2>
              <p className="text-sm leading-6 text-gray-600">
                띠는 운세의 일부일 뿐입니다. 생년월일시를 기반으로 한 사주팔자 분석으로
                더 깊은 인사이트를 확인해보세요.
              </p>
              <a
                href="/saju"
                className="mt-2 w-fit rounded-full bg-[#5956E9] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4745c8]"
              >
                내 사주 보러 가기
              </a>
            </div>
          </section>

        </div>
      </PageContainer>
    </main>
  );
}
