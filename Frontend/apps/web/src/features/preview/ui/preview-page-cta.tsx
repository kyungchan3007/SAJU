import Link from "next/link";
import type { Route } from "next";
import { Button } from "@/shared/ui/button/button";

type PreviewPageCtaProps = {
  title: string;
  description: string;
  href: Route;
  label: string;
};

export function PreviewPageCta({
  title,
  description,
  href,
  label,
}: PreviewPageCtaProps) {
  return (
    <section className="rounded-3xl border border-[#E8E6FF] bg-[#FAFAFF] p-8 text-center">
      <h2 className="mb-2 text-[20px] font-black text-gray-900">{title}</h2>
      <p className="mb-5 text-[13px] leading-relaxed text-gray-500">
        {description}
      </p>
      <Button asChild size="lg" className="rounded-full">
        <Link href={href}>{label}</Link>
      </Button>
    </section>
  );
}
