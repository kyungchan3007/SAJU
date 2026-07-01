import type { Metadata } from "next";
import { getPreviewConfig } from "@/features/preview/model/preview-registry";
import { CompatibilityPreviewPage } from "@/features/preview/pages/compatibility-preview-page";

export const metadata: Metadata = getPreviewConfig("compatibility").metadata;

export default function CompatibilityPreviewRoute() {
  return <CompatibilityPreviewPage />;
}
