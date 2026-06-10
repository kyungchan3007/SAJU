import type { Metadata } from "next";
import { PageContainer } from "@/shared/ui/page-container";

export const metadata: Metadata = {
  title: "사주팔자란 무엇인가? 기초부터 완벽 정리",
  description:
    "사주팔자의 개념, 구성 원리, 보는 방법을 쉽게 설명합니다. 생년월일시로 파악하는 운명의 지도, 사주팔자를 처음 접하는 분께 드리는 완벽 입문 가이드입니다.",
  alternates: { canonical: "/blog/saju-meaning" },
};

const sections = [
  {
    title: "사주팔자란?",
    content:
      "사주팔자(四柱八字)는 사람이 태어난 연(年), 월(月), 일(日), 시(時)의 네 가지 기둥(四柱)과 각 기둥을 이루는 여덟 글자(八字)로 사람의 운명을 파악하는 동양 철학입니다. 수천 년의 역사를 가진 사주는 단순한 점술을 넘어, 개인의 성격·재능·인간관계·운의 흐름을 체계적으로 분석하는 학문입니다.",
  },
  {
    title: "사주의 4개 기둥",
    content:
      "사주는 연주(年柱), 월주(月柱), 일주(日柱), 시주(時柱) 네 기둥으로 구성됩니다. 연주는 태어난 해로 조상과 어린 시절을, 월주는 태어난 달로 부모와 청소년기를, 일주는 태어난 날로 자신과 배우자를, 시주는 태어난 시간으로 자녀와 노년기를 나타냅니다.",
  },
  {
    title: "천간과 지지",
    content:
      "각 기둥은 천간(天干)과 지지(地支) 두 글자로 이루어집니다. 천간은 하늘의 기운을 나타내는 10개의 글자(갑·을·병·정·무·기·경·신·임·계)이고, 지지는 땅의 기운을 나타내는 12개의 글자(자·축·인·묘·진·사·오·미·신·유·술·해)입니다. 4개 기둥 × 2글자 = 총 8글자, 이것이 팔자(八字)입니다.",
  },
  {
    title: "음양오행과의 관계",
    content:
      "사주팔자는 음양(陰陽)과 오행(五行) 이론을 바탕으로 합니다. 오행은 목(木)·화(火)·토(土)·금(金)·수(水)의 다섯 가지 기운으로, 각 천간과 지지는 이 오행 중 하나에 해당합니다. 사주 분석은 8글자의 오행이 어떤 균형을 이루고 있는지를 파악하는 것에서 시작합니다.",
  },
  {
    title: "사주로 알 수 있는 것",
    content:
      "사주팔자로는 타고난 성격과 기질, 직업적 재능, 대인관계의 성향, 건강 취약 부위, 그리고 운의 흐름(대운·세운)을 파악할 수 있습니다. 사주는 운명을 고정된 것으로 보지 않고, 자신을 더 잘 이해하고 유리한 방향으로 나아가기 위한 나침반으로 활용하는 것이 올바른 접근입니다.",
  },
];

export default function SajuMeaningPage() {
  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
              사주 기초
            </span>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              사주팔자란 무엇인가?
            </h1>
            <p className="text-sm leading-relaxed text-gray-500">
              생년월일시로 읽는 나의 운명 지도, 사주팔자의 모든 것
            </p>
          </header>

          <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
            <p>
              사주팔자는 수천 년의 역사를 가진 동양 철학으로, 태어난 시간을 기반으로
              개인의 성격과 운명의 흐름을 파악하는 체계입니다. 단순한 미신이 아닌,
              음양오행의 원리에 기반한 학문적 체계를 가지고 있습니다.
            </p>
          </section>

          {sections.map((s) => (
            <section
              key={s.title}
              className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7"
            >
              <h2 className="mb-3 text-lg font-black text-gray-900">{s.title}</h2>
              <p className="text-sm leading-7 text-gray-600">{s.content}</p>
            </section>
          ))}

          <section className="rounded-3xl bg-[#F0EEFF] px-5 py-6 md:px-7">
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-black text-[#5956E9]">
                내 사주팔자를 직접 확인해보세요
              </h2>
              <p className="text-sm leading-6 text-gray-600">
                생년월일시를 입력하면 AI가 나의 사주를 분석하고 운의 흐름을 알려드립니다.
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
