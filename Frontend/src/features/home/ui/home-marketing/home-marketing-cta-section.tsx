import Link from "next/link";

export function HomeMarketingCtaSection() {
  return (
    <section
      className="py-16 text-center"
      style={{
        background: "linear-gradient(135deg, #5956E9 0%, #7B79F0 100%)",
      }}
    >
      <h2 className="mb-2 text-2xl font-black text-white">
        지금 바로 무료로 시작하세요
      </h2>
      <p className="mb-6 text-sm text-white/70">
        회원가입 없이도 사주 풀이를 확인할 수 있습니다.
      </p>
      <Link
        href="/saju"
        className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold transition hover:opacity-90"
        style={{ color: "#5956E9" }}
      >
        무료 사주 풀이 →
      </Link>
    </section>
  );
}
