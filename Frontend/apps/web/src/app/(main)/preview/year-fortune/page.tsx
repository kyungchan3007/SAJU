import type { Metadata } from "next";
import { getPreviewConfig } from "@/features/preview/model/preview-registry";
import { YearFortunePreviewPage } from "@/features/preview/pages/year-fortune-preview-page";

export const dynamic = "force-static";
export const metadata: Metadata = getPreviewConfig("year-fortune").metadata;

export default function YearFortunePreviewRoute() {
  return <YearFortunePreviewPage />;
}
