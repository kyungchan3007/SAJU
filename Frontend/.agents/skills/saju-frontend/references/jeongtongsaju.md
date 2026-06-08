---
name: saju-frontend-ref-jeongtongsaju
description: /mypage/jeongtongsaju 정통사주 상세 조회 화면과 BFF 작업 규칙
---

# /mypage/jeongtongsaju 작업 참고

## 읽는 조건

`/mypage/jeongtongsaju`, 정통사주 상세 조회, 사주 4기둥·오행·12운성·대운 표시를 수정할 때 읽는다.

## 관련 경로

- `apps/web/src/app/(main)/mypage/jeongtongsaju`
- `apps/web/src/app/api/saju/traditional`
- `apps/web/src/app/api/saju/traditional-fortune`
- `apps/web/src/widgets/mypage/ui/jeongtongsaju-section.tsx`
- `apps/web/src/features/mypage/hooks/useJeongtongsaju.ts`
- `apps/web/src/features/mypage/ui/jeongtongsaju-*`
- `apps/web/src/features/traditional-fortune`
- `apps/web/src/entities/saju/server/onSajuTraditionalGetOnServer.ts`
- `apps/web/src/entities/saju/client/fetchSajuTraditionalOnClient.ts`

## 용어 규칙

- 외부 도메인에서 만세력이라고 부르는 데이터라도 우리 서비스 UI에서는 `정통사주`라고 표기한다.
- HTML 프로토타입, 화면 제목, 버튼, 탭, 안내 문구, 빈 상태, 오류 문구에 `만세력`이라는 단어를 쓰지 않는다.
- 데이터 설명이 필요하면 `정통사주 원국`, `사주 4기둥`, `오행`, `십성`, `12운성`, `대운`처럼 서비스 용어로 풀어 쓴다.
- 코드 내부 타입이나 백엔드 필드명이 generated에 존재하는 경우만 원명을 유지하고, 사용자 노출 문구는 `정통사주` 기준으로 변환한다.

## 정통사주 HTML 프로토타입 규칙

- 프로토타입은 정통사주 데이터를 확인하고 풀이로 이어지는 화면이다.
- 사용자는 원국/오행/12운성/대운 데이터를 보면서 언제든 풀이를 열 수 있어야 한다.
- 홈 시안처럼 왼쪽에 `풀이 보기` 또는 정통사주 풀이 진입 버튼/패널을 항상 접근 가능한 위치에 둔다.
- 데스크탑에서는 왼쪽 풀이 액션 영역과 오른쪽 데이터 확인 영역의 2컬럼 구성을 우선한다.
- 모바일에서는 왼쪽 고정 패널을 그대로 유지하지 말고 상단 sticky 액션 또는 하단 고정 CTA로 축약한다.
- 풀이 버튼은 정통사주 풀이 API(`traditional-fortune`)로 이어지는 동작을 전제로 설계한다.
- 색상, 톤, 이미지 방향은 디자인 전수 시안의 현재 방향을 유지하고, 별도 테마로 재해석하지 않는다.

## generated API 데이터 형태

정통사주 원자료는 generated 기준 `GetMySajuTraditionalResponse`이며 성공 시 `ApiResponseSajuResponse.data`가 `SajuResponse`이다.

```ts
type SajuResponse = {
  sajuId?: number;
  traits?: Record<string, unknown>;
  pillars?: Array<Record<string, unknown>>;
  fiveElements?: Record<string, unknown>;
  bigLuck?: Array<Record<string, unknown>>;
  twelveGrowthInfo?: Record<string, unknown>;
};
```

현재 UI에서 좁혀 쓰는 주요 필드는 다음 기준을 따른다.

- `traits`: `{ summaryZodiac, summaryStrength, geokguk, summaryPillars }`
- `pillars`: 년→월→일→시 순서의 `{ type, stem, branch, twelveGrowth }`
- `fiveElements`: `{ elements: Record<string, number>, yongshinPrimary?, yongshinSecondary? }`
- `bigLuck`: `{ pillar, pillar_kor, year_range, age_range, isCurrentDaeun }[]`
- `twelveGrowthInfo`: `{ year|month|day|hour: { hanja, meaning, description } }`
- `십성` 전용 필드는 현재 generated `SajuResponse`에 명시되어 있지 않다. 프로토타입에 표시가 필요하면 목업 데이터로 분리하고, 실제 API 확정 필드처럼 가정하지 않는다.

정통사주 풀이는 generated 기준 `GetMyTraditionalFortuneResponse`이며 성공 시 `ApiResponseTraditionalFortuneResponse.data`가 `TraditionalFortuneResponse`이다.

```ts
type TraditionalFortuneResponse = {
  description?: string;
  fiveElementsSummary?: string;
  totalScore?: number;
  topPercentage?: string;
  overallFortune?: string;
  favorablePeriods?: string;
  cautiousPeriods?: string;
  wealth?: { flow?: string; firstHalf?: string; secondHalf?: string; advice?: string; score?: number };
  love?: { flow?: string; inRelationship?: string; single?: string; caution?: string; keyPoint?: string; score?: number };
  career?: { flow?: string; firstHalf?: string; secondHalf?: string; advice?: string; keyPoint?: string; score?: number };
  health?: { flow?: string; seasonal?: string; stressManagement?: string; stressHabits?: string; keyPoint?: string; score?: number };
  yearCautions?: string;
};
```

## 작업 규칙

- 클라이언트 조회는 `useJeongtongsaju` React Query 훅을 통한다.
- 클라이언트에서 백엔드를 직접 호출하지 않고 `/api/saju/traditional` BFF를 통한다.
- 정통사주 풀이는 `/api/saju/traditional-fortune` BFF를 통한다.
- BFF는 `onSajuTraditionalGetOnServer`로 위임하고, 백엔드 호출은 `authenticatedBackendFetch`를 사용한다.
- 정통사주 응답 가공과 타입 좁히기는 UI 컴포넌트에 과하게 두지 말고 feature/entity model 분리를 검토한다.
- API route를 바꾸면 `apps/web/src/app/api/saju/traditional/test/route.test.ts`를 함께 갱신한다.
- generated 타입은 참고만 하고 `apps/web/src/generated/api` 아래 파일은 직접 수정하지 않는다.
- generated의 `traits`, `pillars`, `fiveElements`, `bigLuck`, `twelveGrowthInfo`는 넓은 타입이므로 UI에 넘기기 전에 view model에서 타입을 좁힌다.
