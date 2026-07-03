import type { Metadata } from "next";
import { createPageMetadata } from "@/shared/lib/seo";
import { PageContainer } from "@/shared/ui/page-container";
import { ZODIAC_DATA } from "../_data/zodiac-data";

export const metadata: Metadata = createPageMetadata({
  title: "2026년 띠별 운세 총정리 | 12띠 올해 운세 한눈에 보기",
  description: "2026년 띠별 운세가 궁금한 분을 위해 쥐띠부터 돼지띠까지 12띠 올해 운세를 재물, 애정, 건강, 직장 흐름으로 정리했습니다.",
  path: "/blog/2026-zodiac-fortune",
  type: "article",
});

const zodiacs = Object.values(ZODIAC_DATA);

export default function ZodiacFortune2026Page() {
  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
              2026년 운세
            </span>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              2026년 띠별 운세 총정리
            </h1>
            <p className="text-sm leading-relaxed text-gray-500">
              올해 띠별 운세가 궁금할 때 바로 보는 2026년 12띠 정리
            </p>
          </header>

          <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
            <p>
              2026년 병오년은 화(火)의 기운이 강한 해로 열정과 도전의 에너지가 넘칩니다.
              각 띠별로 이 에너지가 어떻게 작용하는지 재물·애정·건강·직장 운으로 정리했습니다.
            </p>
          </section>

          <div className="flex flex-col gap-6">
            {zodiacs.map((z) => (
              <section
                key={z.slug}
                className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{z.emoji}</span>
                    <h2 className="text-lg font-black text-gray-900">{z.name}</h2>
                  </div>
                  <a
                    href={`/blog/${z.slug}`}
                    className="text-xs font-semibold text-[#5956E9] hover:underline"
                  >
                    자세히 보기 →
                  </a>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {z.fortune2026.map((f) => (
                    <div key={f.area} className="rounded-2xl bg-gray-50 px-4 py-3">
                      <p className="mb-1 text-xs font-bold text-[#5956E9]">{f.area}</p>
                      <p className="text-xs leading-5 text-gray-600">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="rounded-3xl bg-[#F0EEFF] px-5 py-6 md:px-7">
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-black text-[#5956E9]">
                띠보다 정확한 나만의 사주 운세
              </h2>
              <p className="text-sm leading-6 text-gray-600">
                같은 띠여도 생년월일시에 따라 운세가 달라집니다. 나만의 사주 분석으로 더 정확한 2026년을 준비하세요.
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
