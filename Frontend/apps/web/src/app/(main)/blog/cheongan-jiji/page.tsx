import type { Metadata } from "next";
import { PageContainer } from "@/shared/ui/page-container";

export const metadata: Metadata = {
  title: "천간(天干)과 지지(地支)란? 사주의 기본 구성 완벽 정리",
  description:
    "사주팔자를 이루는 천간 10개와 지지 12개의 의미와 특성을 알기 쉽게 정리했습니다. 십이지신과 오행의 관계까지 한눈에 파악하세요.",
  alternates: { canonical: "/blog/cheongan-jiji" },
};

const cheongan = [
  { char: "甲", korean: "갑", element: "목(木)", nature: "양", desc: "새싹처럼 뻗어나가는 강한 생명력과 진취성" },
  { char: "乙", korean: "을", element: "목(木)", nature: "음", desc: "유연하게 굽어지는 풀처럼 적응력과 섬세함" },
  { char: "丙", korean: "병", element: "화(火)", nature: "양", desc: "태양처럼 밝고 열정적이며 활발한 기운" },
  { char: "丁", korean: "정", element: "화(火)", nature: "음", desc: "촛불처럼 따뜻하고 지속적인 집중력" },
  { char: "戊", korean: "무", element: "토(土)", nature: "양", desc: "산처럼 묵직하고 믿음직한 안정감" },
  { char: "己", korean: "기", element: "토(土)", nature: "음", desc: "기름진 땅처럼 포용력 있고 실용적인 성격" },
  { char: "庚", korean: "경", element: "금(金)", nature: "양", desc: "쇠처럼 강하고 결단력 있는 추진력" },
  { char: "辛", korean: "신", element: "금(金)", nature: "음", desc: "보석처럼 정교하고 완벽을 추구하는 성향" },
  { char: "壬", korean: "임", element: "수(水)", nature: "양", desc: "강물처럼 넓고 깊은 지혜와 포용력" },
  { char: "癸", korean: "계", element: "수(水)", nature: "음", desc: "이슬처럼 섬세하고 감수성 풍부한 직관력" },
];

const jiji = [
  { char: "子", korean: "자", animal: "쥐", element: "수(水)", month: "11월" },
  { char: "丑", korean: "축", animal: "소", element: "토(土)", month: "12월" },
  { char: "寅", korean: "인", animal: "호랑이", element: "목(木)", month: "1월" },
  { char: "卯", korean: "묘", animal: "토끼", element: "목(木)", month: "2월" },
  { char: "辰", korean: "진", animal: "용", element: "토(土)", month: "3월" },
  { char: "巳", korean: "사", animal: "뱀", element: "화(火)", month: "4월" },
  { char: "午", korean: "오", animal: "말", element: "화(火)", month: "5월" },
  { char: "未", korean: "미", animal: "양", element: "토(土)", month: "6월" },
  { char: "申", korean: "신", animal: "원숭이", element: "금(金)", month: "7월" },
  { char: "酉", korean: "유", animal: "닭", element: "금(金)", month: "8월" },
  { char: "戌", korean: "술", animal: "개", element: "토(土)", month: "9월" },
  { char: "亥", korean: "해", animal: "돼지", element: "수(水)", month: "10월" },
];

export default function CheonganJijiPage() {
  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
              사주 기초
            </span>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              천간(天干)과 지지(地支)란?
            </h1>
            <p className="text-sm leading-relaxed text-gray-500">
              사주팔자 8글자를 이루는 천간 10개 · 지지 12개 완벽 정리
            </p>
          </header>

          <section className="rounded-3xl border border-[#EDE9FF] bg-[#FAFAFF] px-5 py-5 text-sm leading-7 text-gray-600 md:px-7">
            <p>
              사주팔자를 구성하는 8글자는 모두 천간 또는 지지에 해당합니다.
              천간은 하늘의 기운, 지지는 땅의 기운을 나타내며 이 둘의 조합으로
              각 기둥의 성격과 의미가 결정됩니다.
            </p>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
            <h2 className="mb-4 text-lg font-black text-gray-900">천간(天干) 10개</h2>
            <div className="flex flex-col gap-3">
              {cheongan.map((item) => (
                <div key={item.char} className="flex items-start gap-3">
                  <div className="flex w-16 shrink-0 flex-col items-center rounded-2xl bg-[#F0EEFF] py-2">
                    <span className="text-lg font-black text-[#5956E9]">{item.char}</span>
                    <span className="text-xs font-bold text-[#5956E9]">{item.korean}</span>
                  </div>
                  <div className="flex flex-col gap-1 pt-1">
                    <div className="flex gap-2">
                      <span className="text-xs font-semibold text-gray-400">{item.element}</span>
                      <span className="text-xs font-semibold text-gray-400">{item.nature}</span>
                    </div>
                    <p className="text-sm leading-6 text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-100 bg-white px-5 py-6 shadow-sm md:px-7">
            <h2 className="mb-4 text-lg font-black text-gray-900">지지(地支) 12개</h2>
            <div className="grid grid-cols-2 gap-3">
              {jiji.map((item) => (
                <div key={item.char} className="flex items-center gap-3 rounded-2xl border border-gray-100 px-4 py-3">
                  <div className="flex w-10 shrink-0 flex-col items-center rounded-xl bg-[#F0EEFF] py-1.5">
                    <span className="text-base font-black text-[#5956E9]">{item.char}</span>
                    <span className="text-xs font-bold text-[#5956E9]">{item.korean}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-gray-800">{item.animal}띠</span>
                    <span className="text-xs text-gray-400">{item.element} · {item.month}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[#F0EEFF] px-5 py-6 md:px-7">
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-black text-[#5956E9]">
                내 사주의 천간·지지를 확인해보세요
              </h2>
              <p className="text-sm leading-6 text-gray-600">
                생년월일시를 입력하면 나의 사주팔자 8글자와 오행 분석을 제공합니다.
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
