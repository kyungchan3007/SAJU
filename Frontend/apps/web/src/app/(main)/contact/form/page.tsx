import type { Metadata, Route } from "next";
import { redirect } from "next/navigation";

import { getProtectedPageAuthStateOnServer } from "@/entities/auth/server/getProtectedPageAuthStateOnServer";
import { AuthRefreshRetry } from "@/features/saju-result/ui/auth-refresh-retry.client";
import { PageContentLayout } from "@/shared/ui";
import { ContactInquiryFormPageContent } from "@/widgets/contact";

const contactFormPath = "/contact/form" as Route;

export const metadata: Metadata = {
  title: "문의 작성",
  description: "SAJU:ME 서비스 문의를 작성하는 페이지입니다.",
  robots: { index: false, follow: false },
};

export default async function ContactFormPage() {
  const authState = await getProtectedPageAuthStateOnServer(contactFormPath);

  if (authState.kind === "refresh") {
    return <AuthRefreshRetry loginPath={authState.loginPath} />;
  }

  if (authState.kind === "redirect") {
    redirect(authState.loginPath);
  }

  return (
    <PageContentLayout>
      <ContactInquiryFormPageContent />
    </PageContentLayout>
  );
}
