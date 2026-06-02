import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

// [DS] 역할: 디자인 토큰 기반의 페이지 폭(content 1152px, reading 720px, modal 360px)을 제공한다.
// [DS] 현재 사용처: PageContentLayout 내부에서 일반 콘텐츠 폭을 맞추는 기준 컨테이너.
type PageContainerWidth = "content" | "reading" | "modal";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  width?: PageContainerWidth;
};

const widthClassNames: Record<PageContainerWidth, string> = {
  content: "max-w-saju-content",
  reading: "max-w-saju-reading",
  modal: "max-w-saju-modal",
};

export function PageContainer({
  children,
  className,
  width = "content",
}: PageContainerProps) {
  // [DS] domain:shared component:PageContainer ui:layout
  return (
    <div className={cn("mx-auto w-full px-4 md:px-8", widthClassNames[width], className)}>
      {children}
    </div>
  );
}
