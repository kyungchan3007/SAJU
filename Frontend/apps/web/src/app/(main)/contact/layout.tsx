import type { ReactNode } from "react";
import { StaticPageLayout } from "@/shared/ui/static-page-layout";

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <StaticPageLayout>{children}</StaticPageLayout>;
}
