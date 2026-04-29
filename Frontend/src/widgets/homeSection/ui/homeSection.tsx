import Link from "next/link";
import type { Route } from "next";
import { OpenmojiImg } from "@/shared/ui/openmoji-img";

interface HomeLinkItem {
  href: Route;
  label: string;
}

interface HomeIconLinkItem extends HomeLinkItem {
  emoji: string;
  isNew: boolean;
}

interface HomeServiceCategory {
  category: string;
  items: HomeLinkItem[];
}

const QUICK_MENUS: HomeIconLinkItem[] = [
  { href: "/saju", emoji: "🏮", label: "신년운세", isNew: false },
  { href: "/saju", emoji: "🪬", label: "토정비결", isNew: false },
  { href: "/saju", emoji: "📖", label: "정통사주", isNew: false },
  { href: "/saju", emoji: "📅", label: "오늘의 운세", isNew: false },
  { href: "/saju", emoji: "🌙", label: "내일의 운세", isNew: false },
  { href: "/location", emoji: "📍", label: "지정일 운세", isNew: false },
  { href: "/saju", emoji: "🪞", label: "관상", isNew: true },
  { href: "/saju", emoji: "🧠", label: "심리풀이", isNew: true },
  { href: "/compatibility", emoji: "💑", label: "짝궁합", isNew: false },
];

const PROMO_CARDS: HomeIconLinkItem[] = [
  { href: "/saju", emoji: "🔮", label: "사주풀이", isNew: false },
  { href: "/compatibility", emoji: "💞", label: "궁합", isNew: true },
  { href: "/saju", emoji: "☯️", label: "오늘의 기운", isNew: false },
  { href: "/location", emoji: "🗺️", label: "지역운세", isNew: true },
  { href: "/saju", emoji: "🌟", label: "연간운세", isNew: false },
  { href: "/saju", emoji: "🎴", label: "타로", isNew: true },
];

const SERVICE_CATEGORIES: HomeServiceCategory[] = [
  {
    category: "사주 & 운명",
    items: [
      { label: "무료 사주풀이", href: "/saju" },
      { label: "오늘의 운세", href: "/saju" },
      { label: "연간 운세", href: "/saju" },
      { label: "월간 운세", href: "/saju" },
    ],
  },
  {
    category: "인연 & 궁합",
    items: [
      { label: "연인 궁합", href: "/compatibility" },
      { label: "부부 궁합", href: "/compatibility" },
      { label: "친구 궁합", href: "/compatibility" },
      { label: "비즈니스 궁합", href: "/compatibility" },
    ],
  },
  {
    category: "지역 & 풍수",
    items: [
      { label: "지역 운세", href: "/location" },
      { label: "이사 풍수", href: "/location" },
      { label: "사무실 방위", href: "/location" },
      { label: "여행 운세", href: "/location" },
    ],
  },
];

export function HomeSection() {
  return (
    <div className="min-h-dvh bg-[rgb(250,248,242)]">
      {/* 히어로 배너 */}
      <section className="">
        <div className="container py-14 sm:pt-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
            {/* 좌: 카피 */}
            <div className="flex flex-col justify-center gap-6">
              <p className="text-xs font-semibold text-black/40">소름 돋는 미래 예측</p>
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
            <div className="hero-panel flex flex-col gap-4">
              <p className="text-xs font-semibold text-black/40">오늘의 운세</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">☯️</span>
                <div>
                  <p className="font-display text-lg font-black text-black">
                    오늘의 기운
                  </p>
                  <p className="text-sm text-black/50">
                    생년월일을 입력하면 확인할 수 있어요
                  </p>
                </div>
              </div>
              <div className="mt-2 border-t-2 border-dashed border-black/10 pt-4">
                <Link
                  href="/saju"
                  className="btn-saju btn-saju-primary block w-full text-center"
                >
                  시작하기
                </Link>
              </div>
            </div>
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
              <div className="grid grid-cols-3 gap-y-6">
                {QUICK_MENUS.map((menu) => (
                  <Link
                    key={menu.label}
                    href={menu.href}
                    className="relative flex flex-col items-center gap-2 rounded-sm p-2 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
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
              <div className="grid grid-cols-2 gap-y-6">
                {PROMO_CARDS.map((card) => (
                  <Link
                    key={card.label}
                    href={card.href}
                    className="relative flex flex-col items-center gap-2 rounded-sm p-2 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
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
