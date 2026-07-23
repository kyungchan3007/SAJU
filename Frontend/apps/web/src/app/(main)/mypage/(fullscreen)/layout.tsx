import { QueryProviderLayout } from "@/shared/app-infra/query-provider/query-provider-layout";

export default function MypageFullscreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryProviderLayout>{children}</QueryProviderLayout>;
}
