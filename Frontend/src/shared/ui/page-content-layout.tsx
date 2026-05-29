import { PageContainer } from "@/shared/ui/page-container";

// [DS] 역할: 흰색 전체 배경 밴드와 중앙 콘텐츠 컨테이너를 묶은 기본 페이지 레이아웃.
// [DS] 현재 사용처: 사주 미리보기, 궁합 섹션, 마이페이지 정통사주/신년운세 섹션.
export function PageContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <PageContainer>{children}</PageContainer>
    </div>
  );
}
