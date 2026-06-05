---
name: saju-docs-ref-architecture
description: Docusaurus 문서 사이트 구조, 주요 파일 위치, 수정 원칙
---

# 문서 사이트 아키텍처 참고

## 서비스 개요

- 문서 사이트는 `apps/docs`의 Docusaurus 앱이다.
- 배포 주소는 `https://docs.saju.me`다.
- 목적은 `saju` 서비스와 분리된 개발 문서/운영 블로그 제공이다.

## 주요 구조

- `apps/docs/docusaurus.config.ts`: 사이트 URL, navbar/footer, preset, 블로그/문서 설정
- `apps/docs/sidebars.ts`: 문서 사이드바 정의
- `apps/docs/docs/**`: 문서 본문
- `apps/docs/blog/**`: 블로그 포스트, authors, tags
- `apps/docs/src/pages/index.tsx`: 홈 랜딩
- `apps/docs/src/css/custom.css`: 문서 사이트 전용 테마 오버라이드

## 작업 원칙

- 문서 IA, 카테고리, 사이드바 변경은 파일 구조와 `sidebars.ts`를 함께 본다.
- 라이트/다크 모드의 본문 가독성은 `custom.css`의 docs 전용 semantic 변수 기준으로 조정한다.
- 서비스 브랜드 토큰은 공유하되, 문서 텍스트/표면 색상은 문서 사이트에서 별도로 override할 수 있다.
- 문서용 홈 랜딩은 서비스 랜딩과 구분해 유지한다.
- 자동 생성 폴더 `build`, `.docusaurus`는 수정하지 않는다.
