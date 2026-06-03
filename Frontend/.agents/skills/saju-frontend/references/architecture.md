---
name: saju-frontend-ref-architecture
description: 기술 스택, 레이어 구조(app/widgets/features/entities/shared), 주요 라우트 목록, 작업 원칙
---

# 프론트엔드 아키텍처 참고

## 기술 스택

- Framework: Next.js App Router (`next@16`)
- Language: TypeScript strict
- UI: Tailwind CSS + shadcn-style 공용 Button
- Auth: Backend Kakao OAuth + BFF HttpOnly 쿠키 브리지
- State: React local state + 일부 Zustand
- Data Fetch: `fetch` 중심, React Query 클라이언트 준비

## 레이어 구조

- `apps/web`: Next.js 앱 workspace
- `apps/web/src/app`: 라우트 엔트리, API BFF, SEO 메타 정의
- `apps/web/src/widgets`: 페이지 단위 조합 블록
- `apps/web/src/features`: 사용자 인터랙션 단위 기능
- `apps/web/src/domain`: 도메인 UI와 룩업 데이터
- `apps/web/src/entities`: 도메인 타입과 서버 유틸
- `apps/web/src/shared`: 공용 API 응답 포맷, 설정, UI, 유틸, 인프라 프로바이더
- `packages/design-tokens`: 도메인 없는 디자인 토큰
- `packages/ui`: 도메인 없는 무상태 UI primitive

## 주요 라우트

- `/`: HOME
- `/login`: 카카오/이메일 로그인 진입
- `/saju`: 사주 입력 흐름
- `/saju/result`: 사주 결과 조회
- `/compatibility`: 궁합 결과와 결제 유도
- `/location`: 위치 추천과 지도
- `/mypage`: 사용자 정보와 관리 화면
- `/mypage/jeongtongsaju`: 정통사주 상세 조회

## 작업 원칙

- 전체 구조 질문, 리팩터링, 신규 기능 설계 요청일 때만 이 문서를 읽는다.
- 이후 실제 수정 대상 도메인의 reference를 1개만 추가로 읽는다.
- feature 내부의 상태 관리, 파생 계산, 제출/조회 행위는 우선 `hooks/`로 분리한다.
- `form/client`, `ui` 컴포넌트는 props 기반 렌더링에 집중한다.
- 여러 도메인에서 재사용되는 포맷팅, 파싱, 변환, 가드 함수는 `apps/web/src/shared/utils` 배치를 검토한다.
- 전역 재사용 가능성이 애매하면 `shared`로 올리기 전에 사용자에게 확인한다.
- 패키지로 올릴 대상은 앱 경계(`features`, `entities`, `widgets`, `app`)를 import하지 않아야 한다.
