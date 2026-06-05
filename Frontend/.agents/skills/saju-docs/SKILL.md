---
name: saju-docs
description: >-
  이 저장소의 Docusaurus 문서 사이트(`apps/docs`) 작업에 사용한다. 문서 구조 개편,
  카테고리/사이드바/블로그 정리, Docusaurus 설정 수정, docs.saju.me 테마 조정,
  공용 디자인 토큰 연동, 문서 서비스 운영 규칙 정리가 해당된다. Next.js 앱 기능
  구현이 아니라 문서 사이트 자체를 수정할 때 사용한다.
---

# 사주 문서 사이트 스킬

작업 시작 전 대상이 `apps/docs`인지 먼저 식별한다.

## 읽기 규칙

- 기본으로 이 파일만 읽는다.
- 전체 구조, 사이드바, 카테고리, Docusaurus 설정, 홈 랜딩, 테마 작업이면 `references/architecture.md`를 읽는다.
- 문서 본문 내용만 수정할 때는 관련 `apps/docs/docs/**` 문서만 읽고 다른 reference는 추가로 읽지 않는다.
- 여러 영역을 함께 바꿀 때만 필요한 파일을 추가로 읽는다.

## 공통 규칙

- 문서 사이트 루트는 `apps/docs`이며 Docusaurus workspace 이름은 `@saju/docs`다.
- 실행/빌드는 루트에서 `npm run docs:dev`, `npm run docs:build`를 우선 사용한다.
- 문서 앱 설정은 `apps/docs/docusaurus.config.ts`, 사이드바는 `apps/docs/sidebars.ts`를 우선 확인한다.
- 문서 콘텐츠는 `apps/docs/docs/**`, 블로그 콘텐츠는 `apps/docs/blog/**`에 둔다.
- 공용 브랜드 토큰은 `@saju/design-tokens/css`를 우선 사용하고, 문서 전용 semantic 색상은 `apps/docs/src/css/custom.css`에서만 조정한다.
- `apps/docs/build/**`, `apps/docs/.docusaurus/**`는 생성 산출물이므로 직접 수정하지 않는다.
- 서비스 앱 규칙과 문서 사이트 규칙이 충돌하면 `apps/docs` 기준을 우선한다.
- 관련 없는 `.md` 파일은 읽지 않는다.

## 갱신 규칙

- 문서 사이트 운영 규칙, 카테고리 체계, 테마 원칙, 배포 구조가 바뀌면 이 스킬 또는 `references/architecture.md`를 함께 갱신한다.
- 문서는 짧게 유지하고 구현에 직접 필요한 규칙만 남긴다.
