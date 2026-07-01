import type { Metadata } from "next";
import { getPreviewConfig } from "@/features/preview/model/preview-registry";
import { TraditionalSajuPreviewPage } from "@/features/preview/pages/traditional-saju-preview-page";

export const metadata: Metadata = getPreviewConfig("traditional-saju").metadata;

export default function TraditionalSajuPreviewRoute() {
  return <TraditionalSajuPreviewPage />;
}
