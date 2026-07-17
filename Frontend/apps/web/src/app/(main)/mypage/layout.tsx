/**
 * <main>을 여기서 렌더하지 않는다.
 * 상위 (main)/layout.tsx가 이미 <main className="flex flex-1 flex-col">을 제공하며,
 * 여기서 <main>을 한 겹 더 두면 (1) 문서에 <main>이 둘이 되어 HTML이 유효하지 않고
 * (2) block 요소가 끼어들어 flex 사슬이 끊기면서 FortuneGateLayout의 flex-1이 죽는다.
 */
export default async function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
