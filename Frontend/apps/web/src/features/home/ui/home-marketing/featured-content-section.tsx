import Link from "next/link";
import type { Route } from "next";
import { PageContainer } from "@/shared/ui/page-container";

const featuredLinks: Array<{
  href: Route;
  eyebrow: string;
  title: string;
  description: string;
}> = [
  {
    href: "/blog/saju-meaning",
    eyebrow: "사주 기초",
    title: "사주팔자란 무엇인가?",
    description: "사주팔자의 개념, 구조, 읽는 기준을 초보자 관점에서 정리한 입문 글입니다.",
  },
  {
    href: "/blog/how-to-read-saju",
    eyebrow: "읽는 법",
    title: "사주 보는 법 입문",
    description: "생년월일시를 바탕으로 무엇을 보고 어떻게 해석하는지 6단계로 설명합니다.",
  },
  {
    href: "/blog/2026-fortune",
    eyebrow: "연도 운세",
    title: "2026년 병오년 운세",
    description: "올해의 전체 흐름과 재물, 애정, 건강, 직장운의 포인트를 정리했습니다.",
  },
  {
    href: "/faq",
    eyebrow: "서비스 안내",
    title: "FAQ 자주 묻는 질문",
    description: "로그인, 결제, 데이터 처리, 서비스 이용 방식에 대한 기본 안내를 확인할 수 있습니다.",
  },
  {
    href: "/contact",
    eyebrow: "운영 안내",
    title: "문의하기",
    description: "서비스 관련 문의, 개인정보 관련 요청, 운영 문의를 접수할 수 있는 공개 안내 페이지입니다.",
  },
  {
    href: "/privacy-policy",
    eyebrow: "정책",
    title: "개인정보처리방침",
    description: "수집 항목, 이용 목적, 보관 기간과 이용자 권리를 확인할 수 있습니다.",
  },
];

export function FeaturedContentSection() {
  return (
    <section className="bg-[#FAFAFA] py-20">
      <PageContainer width="content">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <div className="text-xs text-gray-400">먼저 읽어보면 좋은 공개 콘텐츠</div>
            <h2 className="text-3xl font-black leading-snug text-gray-900">
              사주 이야기와 운영 안내
            </h2>
            <p className="text-sm leading-relaxed text-gray-500">
              사주 입문 글, 연도 운세, 자주 묻는 질문과 운영 정책을 한곳에서 바로 확인해보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-gray-100 bg-white px-5 py-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#5956E9]">
                  {item.eyebrow}
                </div>
                <div className="mb-2 text-lg font-black text-gray-900">{item.title}</div>
                <p className="text-sm leading-6 text-gray-600">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
