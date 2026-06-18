import Link from "next/link";
import {
  BarChart3,
  Bell,
  ExternalLink,
  LayoutDashboard,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button, Card } from "@saju/ui";

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "실시간 대시보드",
    description: "서비스 트래픽, 요청 수, 응답 바이트를 한눈에 확인하세요.",
  },
  {
    icon: Users,
    title: "유저 관리",
    description: "가입 유저 목록과 커뮤니티 코호트를 손쉽게 관리합니다.",
  },
  {
    icon: BarChart3,
    title: "사용량 분석",
    description: "Cloudflare 기반 24시간 요청 로그와 Workers 에러율을 추적합니다.",
  },
  {
    icon: Bell,
    title: "알림 센터",
    description: "서비스 이상 징후와 주요 이벤트를 즉시 알림으로 받아보세요.",
  },
  {
    icon: ShieldCheck,
    title: "접근 제어",
    description: "관리자 전용 인증으로 중요한 운영 데이터를 안전하게 보호합니다.",
  },
  {
    icon: BarChart3,
    title: "모니터링",
    description: "서버 상태와 API 응답 시간을 지속적으로 모니터링합니다.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-saju-bg">
      {/* Navbar */}
      <header className="sticky top-0 z-nav border-b border-surface-border bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-saju-content items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="bg-saju-gradient bg-clip-text text-xl font-bold text-transparent">
              SAJU:ME
            </span>
            <span className="rounded-full bg-saju-tint px-2 py-0.5 text-xs font-semibold text-saju-primary">
              Admin
            </span>
          </div>

          <nav className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://saju-me.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                실서비스 바로가기
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link href="/login">로그인</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        {/* Background orbs */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-96 w-96 rounded-full bg-saju-primary opacity-10 blur-3xl" />
        </div>
        <div className="pointer-events-none absolute right-1/4 top-24">
          <div className="h-64 w-64 rounded-full bg-saju-purple opacity-10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <span className="mb-4 inline-block rounded-full border border-saju-border bg-saju-soft px-4 py-1.5 text-sm font-medium text-saju-primary">
            관리자 전용 플랫폼
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-content-primary sm:text-5xl">
            SAJU:ME{" "}
            <span className="bg-saju-gradient bg-clip-text text-transparent">어드민</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-content-muted">
            서비스 현황을 한눈에 파악하고,<br />
            유저와 커뮤니티를 효율적으로 운영하세요.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/login">어드민 로그인</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://saju-me.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                실서비스 보기
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Glassmorphism preview card */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="rounded-saju-panel border border-saju-border bg-white/70 p-6 shadow-saju-lg backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-content-secondary">대시보드 미리보기</span>
              <span className="flex items-center gap-1.5 text-xs text-status-success">
                <span className="h-2 w-2 rounded-full bg-status-success" />
                정상 운영 중
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "등록 유저", value: "2,481" },
                { label: "오늘 요청", value: "148K" },
                { label: "오늘 방문", value: "3,920" },
                { label: "에러율", value: "0.02%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-saju-card border border-surface-border bg-white p-4 shadow-saju-sm"
                >
                  <p className="text-xs text-content-muted">{stat.label}</p>
                  <p className="mt-1 text-xl font-bold text-content-primary">{stat.value}</p>
                </div>
              ))}
            </div>
            {/* Mini bar chart decoration */}
            <div className="mt-4 flex items-end gap-1" style={{ height: 48 }}>
              {[30, 55, 40, 70, 60, 80, 50, 90, 65, 75, 45, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-saju-primary opacity-60"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="mt-2 text-right text-[10px] text-content-subtle">시간대별 요청수</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-saju-content">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-content-primary sm:text-3xl">주요 기능</h2>
            <p className="mt-3 text-content-muted">서비스 운영에 필요한 모든 도구를 제공합니다.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} variant="elevated" className="p-6 transition-shadow hover:shadow-saju-md">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-saju-soft">
                    <Icon className="h-5 w-5 text-saju-primary" />
                  </div>
                  <h3 className="font-semibold text-content-primary">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-content-muted">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-saju-content">
          <div className="rounded-saju-panel bg-saju-gradient p-10 text-center text-white shadow-saju-lg">
            <h2 className="text-2xl font-bold sm:text-3xl">지금 바로 시작하세요</h2>
            <p className="mt-3 text-white/80">
              SAJU:ME 어드민으로 서비스를 더 스마트하게 관리하세요.
            </p>
            <Button
              className="mt-6 border border-white/30 bg-white text-saju-primary hover:bg-white/90"
              size="lg"
              asChild
            >
              <Link href="/login">어드민 로그인</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-border px-6 py-8">
        <div className="mx-auto flex max-w-saju-content flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="bg-saju-gradient bg-clip-text font-bold text-transparent">SAJU:ME</span>
            <span className="text-sm text-content-muted">Admin</span>
          </div>
          <p className="text-sm text-content-subtle">© 2025 SAJU:ME. All rights reserved.</p>
          <a
            href="https://saju-me.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-content-muted transition-colors hover:text-saju-primary"
          >
            실서비스 바로가기
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
