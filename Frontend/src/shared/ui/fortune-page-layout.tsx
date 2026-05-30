/**
 * FortuneGateLayout
 * 광고 게이트(AdProgressGate)를 화면 수직 중앙에 고정하는 래퍼.
 * main이 flex flex-col flex-1이므로 flex-1로 남은 높이를 채운 뒤 중앙 정렬.
 */
export function FortuneGateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center bg-white px-4 py-8">
      {children}
    </div>
  );
}

/**
 * FortunePageLayout
 * 풀이 결과 컨텐츠용 max-width 래퍼.
 * year-fortune, traditional-fortune 등 풀이 결과 페이지에서 공통으로 사용.
 */
export function FortunePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-8">
      {children}
    </div>
  );
}
