import type { ReactNode } from "react";
import { StaticPageLayout } from "@/shared/ui/static-page-layout";

export default function FaqLayout({ children }: { children: ReactNode }) {
  return <StaticPageLayout>{children}</StaticPageLayout>;
}
