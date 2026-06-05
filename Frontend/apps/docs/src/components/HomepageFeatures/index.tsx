import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  icon: ReactNode;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "서비스와 분리된 문서 운영",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    description: (
      <>
        <code>apps/web</code>와 문서 사이트를 분리해 릴리스 주기와 배포 책임을 명확하게 관리합니다.
      </>
    ),
  },
  {
    title: "개발 문서와 운영 메모 통합",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    description: (
      <>
        프론트엔드 구조, API 경계, 공용 UI 정책, 배포 기록을 한 도메인에서 검색하고 버전 관리합니다.
      </>
    ),
  },
  {
    title: "블로그 기반 변경 기록",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    description: (
      <>
        릴리스 노트, 작업 로그, 기술 회고를 블로그로 문서와 함께 운영합니다.
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDesc}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
