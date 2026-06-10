import type { ReactNode } from "react";

import { PageContainer } from "@/shared/ui/page-container";

type StaticPageLayoutProps = {
  children: ReactNode;
};

export function StaticPageLayout({ children }: StaticPageLayoutProps) {
  return (
    <main className="bg-white py-10 md:py-14">
      <PageContainer width="reading">
        <div className="flex flex-col gap-6">{children}</div>
      </PageContainer>
    </main>
  );
}
