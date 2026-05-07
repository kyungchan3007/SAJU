import Link from "next/link";
import { OpenmojiImg } from "@/shared/ui/openmoji-img";
import { PROMO_CARDS, QUICK_MENUS } from "@/features/home/model/model";
import { HomeTodaySajuCard } from "@/features/home/ui/home-today-saju-card.client";

export function HomeSection() {
  return (
    <div className="min-h-dvh bg-[rgb(250,248,242)]">
      {/* 히어로 배너 */}
      <section className="">
        <div className="container py-14 sm:pt-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
            {/* 좌: 카피 */}
            <div className="flex flex-col justify-center gap-6">
              <p className="text-xs font-semibold text-black/40">
                소름 돋는 미래 예측
              </p>
              <h1 className="font-display text-4xl font-black leading-tight text-black sm:text-5xl lg:text-6xl">
                오늘의 운명,
                <br />
                <span className="sketch-highlight">지금 확인하세요</span>
              </h1>
              <p className="max-w-md text-base leading-relaxed text-black/60">
                사주팔자, 궁합, 지역 운세를 한 곳에서 운명과 인연의 방향을
                살펴보세요.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/saju" className="btn-saju btn-saju-primary">
                  무료 사주 풀이 →
                </Link>
                <Link
                  href="/compatibility"
                  className="btn-saju btn-saju-secondary"
                >
                  궁합 보기
                </Link>
              </div>
            </div>
            {/* 우: 히어로 카드 */}
            <HomeTodaySajuCard />
          </div>
        </div>
      </section>

      {/* 서비스 바로가기 + 추천 서비스 — 한 row에 나란히 */}
      <section className="border-b-2 border-black">
        <div className="container pb-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
            {/* 서비스 바로가기 (9개 → 3열) */}
            <div className="card-saju-primary flex-1 p-6">
              <h2 className="mb-5 font-display text-lg font-black text-black">
                서비스 바로가기
              </h2>
              <div className="grid grid-cols-3 gap-y-3">
                {QUICK_MENUS.map((menu) => (
                  <Link
                    key={menu.label}
                    href={menu.href}
                    className="relative flex flex-col items-center gap-2 rounded-sm p-1 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    <span className="text-3xl leading-none">
                      <OpenmojiImg emoji={menu?.emoji ?? "🌙"} size={36} />
                    </span>
                    <span className="text-center text-xs font-semibold text-black">
                      {menu.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 추천 서비스 (6개 → 3열) */}
            <div className="card-saju-primary flex-1 p-6">
              <h2 className="mb-5 font-display text-lg font-black text-black">
                추천 서비스
              </h2>
              <div className="grid grid-cols-2 gap-y-3">
                {PROMO_CARDS.map((card) => (
                  <Link
                    key={card.label}
                    href={card.href}
                    className="relative flex flex-col items-center gap-2 rounded-sm p-1 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    <span className="text-3xl leading-none">
                      <OpenmojiImg emoji={card?.emoji ?? "🌙"} size={36} />
                    </span>
                    <span className="text-center text-xs font-semibold text-black">
                      {card.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리별 서비스 리스트 */}
      {/*<section className="">*/}
      {/*  <div className="container py-10">*/}
      {/*    <h2 className="mb-6 font-display text-lg font-black text-black">*/}
      {/*      전체 서비스*/}
      {/*    </h2>*/}
      {/*    <div className="grid gap-6 sm:grid-cols-3">*/}
      {/*      {SERVICE_CATEGORIES.map((cat) => (*/}
      {/*        <div key={cat.category} className="card-saju-primary p-6">*/}
      {/*          <h3 className="mb-4 font-display text-sm font-black text-black">*/}
      {/*            {cat.category}*/}
      {/*          </h3>*/}
      {/*          <ul className="flex flex-col gap-2">*/}
      {/*            {cat.items.map((item) => (*/}
      {/*              <li key={item.label}>*/}
      {/*                <Link*/}
      {/*                  href={item.href}*/}
      {/*                  className="flex items-center justify-between text-sm text-black/70 transition hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"*/}
      {/*                >*/}
      {/*                  <span>{item.label}</span>*/}
      {/*                  <span className="text-black/30">→</span>*/}
      {/*                </Link>*/}
      {/*              </li>*/}
      {/*            ))}*/}
      {/*          </ul>*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* 하단 CTA */}
      <section className="container py-14 text-center">
        <h2 className="font-display text-2xl font-black text-black sm:text-3xl">
          지금 바로 무료로 시작하세요
        </h2>
        {/*<p className="mx-auto mt-3 max-w-sm text-sm text-black/50">*/}
        {/*  회원가입 없이도 사주 풀이를 확인할 수 있습니다.*/}
        {/*</p>*/}
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/saju" className="btn-saju btn-saju-primary">
            무료 사주 풀이 →
          </Link>
        </div>
      </section>
    </div>
  );
}
