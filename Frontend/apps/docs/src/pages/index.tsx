import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

const quickLinks = [
  {
    label: "문서 개요",
    to: "/docs/intro",
    iconBg: "var(--ql-bg-indigo)",
    iconColor: "var(--ql-color-indigo)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    label: "프로젝트 구조",
    to: "/docs/architecture/overview",
    iconBg: "var(--ql-bg-blue)",
    iconColor: "var(--ql-color-blue)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
      </svg>
    ),
  },
  {
    label: "API 연동 가이드",
    to: "/docs/guides/api-integration",
    iconBg: "var(--ql-bg-purple)",
    iconColor: "var(--ql-color-purple)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
      </svg>
    ),
  },
  {
    label: "AI Agent 활용",
    to: "/docs/ai-agent/overview",
    iconBg: "var(--ql-bg-orange)",
    iconColor: "var(--ql-color-orange)",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    label: "GitHub 저장소",
    href: "https://github.com/proejct-saju/saju",
    iconBg: "#1f2937",
    iconColor: "#ffffff",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    divider: true,
  },
];

const features = [
  {
    title: "개발 구조 문서화",
    desc: "Next.js App Router, FSD Hybrid 구조와 공통 UI, API 계층을 기준으로 프로젝트 구조를 체계적으로 정리합니다.",
    iconBg: "rgba(99,102,241,0.15)",
    iconColor: "#818cf8",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    title: "운영 기준 관리",
    desc: "배포 환경, 환경 변수, 장애 대응, 릴리즈 체크리스트 등 운영에 필요한 기준과 절차를 문서로 관리합니다.",
    iconBg: "rgba(34,197,94,0.15)",
    iconColor: "#4ade80",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
      </svg>
    ),
  },
  {
    title: "변경 기록 축적",
    desc: "블로그와 릴리즈 노트를 통해 기능 변경, 작업 로그, 운영 이슈를 투명하게 기록하고 공유합니다.",
    iconBg: "rgba(249,115,22,0.15)",
    iconColor: "#fb923c",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
      </svg>
    ),
  },
];

function ArrowIcon() {
  return (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 5l7 7m0 0l-7 7m7-7H3"/>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5l7 7-7 7"/>
    </svg>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description="saju-me 프론트엔드와 제품 운영을 위한 개발 문서 사이트">

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.auroraSpot1} />
        <div className={styles.auroraSpot2} />
        <div className={styles.auroraSpot3} />

        <div className={styles.heroInner}>
          {/* Left */}
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>SAJU-ME DOCS</span>
            <Heading as="h1" className={styles.heroTitle}>
              saju-me 개발 문서와<br />
              운영 가이드를 한 곳에<br />
              정리합니다.
            </Heading>
            <p className={styles.heroDesc}>
              프론트엔드 구조, 공통 UI, API 연동, 배포 정책, 운영 메모를 문서화하여<br />
              개발과 운영 흐름을 일관되게 관리합니다.
            </p>
            <div className={styles.heroButtons}>
              <Link className={styles.btnPrimary} to="/docs/intro">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                문서 시작하기
              </Link>
              <Link className={styles.btnSecondary} to="/blog">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                변경로그 보기
              </Link>
            </div>
          </div>

          {/* Right — Quick Links Card */}
          <div className={styles.heroCardWrap}>
            <div className={styles.quickCard}>
              <p className={styles.quickCardLabel}>바로가기</p>
              <ul className={styles.quickList}>
                {quickLinks.map((item, i) => {
                  const inner = (
                    <>
                      <span className={styles.quickIconWrap} style={{ background: item.iconBg, color: item.iconColor }}>
                        {item.icon}
                      </span>
                      <span className={styles.quickLabel}>{item.label}</span>
                      <span className={styles.quickChevron}><ChevronIcon /></span>
                    </>
                  );
                  return (
                    <li key={i} className={item.divider ? styles.quickItemDivider : styles.quickItem}>
                      {"href" in item
                        ? <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.quickLink}>{inner}</a>
                        : <Link to={item.to} className={styles.quickLink}>{inner}</Link>
                      }
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className={styles.features}>
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>문서 사이트에서 관리하는 핵심 영역</Heading>
          <p className={styles.featuresDesc}>개발부터 운영까지, 필요한 모든 정보를 체계적으로 관리하고 공유합니다.</p>
        </div>
        <div className={styles.featureGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIconOuter}>
                <span className={styles.featureIconInner} style={{ background: f.iconBg, color: f.iconColor }}>
                  {f.icon}
                </span>
              </div>
              <h3 className={styles.featureCardTitle}>{f.title}</h3>
              <p className={styles.featureCardDesc}>{f.desc}</p>
              <div className={styles.featureArrowWrap}>
                <span className={styles.featureArrow}><ArrowIcon /></span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </Layout>
  );
}
