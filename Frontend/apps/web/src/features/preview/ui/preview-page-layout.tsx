import type { ReactNode } from "react";
import { PageContentLayout } from "@/shared/ui/page-content-layout";

type PreviewPageLayoutProps = {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function PreviewPageLayout({
  badge,
  title,
  description,
  children,
}: PreviewPageLayoutProps) {
  return (
    <PageContentLayout>
      <div className="flex flex-col md:py-7">
        <header className="flex flex-col gap-2">
          <span className="w-fit rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#5956E9]">
            {badge}
          </span>
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-gray-500">
              {description}
            </p>
          </div>
        </header>
        {children}
      </div>
    </PageContentLayout>
  );
}
