# /saju Domain Card (Token-Slim)

## 빠른 요약
- 전체 아키텍처/공통 플로우: `PROJECT_ARCHITECTURE_CARD.md`
- 페이지 엔트리: `src/app/(main)/saju/page.tsx`
- 페이지 구성:
  - `/saju` -> `SajuInputForm`
  - `/saju/result` -> `SajuPreviewCard` (로그인 필요)
- API 라우트: `src/app/api/saju/route.ts` (`GET` 준비 응답, `POST`는 `saju_access_token` 필요)

## 변경 범위 가이드
- `/saju` 페이지 메타/레이아웃: `src/app/(main)/saju/page.tsx`
- 입력 폼/입력 플로우: `src/features/saju-input/**`
- 결과 프리뷰/가이드 카드: `src/domain/saju/**`, `src/widgets/saju-result/**`
- 서버 연동(BFF): `src/app/api/saju/route.ts`

## 작업 원칙
- `/saju` 작업이면 이 문서를 먼저 읽고 시작한다.
- 관련 없는 문서는 열지 않는다.
- UI 문구/스타일만 바꾸는 작업은 API 코드를 건드리지 않는다.
- API 작업은 인증 쿠키(`saju_access_token`) 처리 유지 여부를 먼저 점검한다.

## 시작 체크리스트
1. 이번 요청이 `/saju` 범위인지 확인
2. 수정 대상 파일 1~3개 먼저 지정
3. 영향 범위(UI/API/타입) 간단 메모 후 구현
4. 완료 후 변경 파일 기준으로만 검증

## Claude 시작 프롬프트 (복붙용)
```txt
이번 작업은 /saju 범위입니다.
먼저 src/domain/saju/saju-card.md의 "빠른 요약 / 변경 범위 가이드 / 시작 체크리스트"만 읽고,
핵심 이해를 5줄 이내로 요약한 뒤 구현을 시작하세요.
관련 없는 .md 파일은 읽지 마세요.
```
