import Link from "next/link";
import type { Route } from "next";

type MarketingExampleCardProps = {
  title: string;
  description: string;
};

export function MarketingExampleCard({
  title,
  description,
}: MarketingExampleCardProps) {
  return (
    <div
      className="rounded-2xl px-4 py-4"
      style={{ border: "1px solid #E9E7FF", background: "#FAFAFF" }}
    >
      <div className="mb-1 text-xs font-bold" style={{ color: "#5956E9" }}>
        {title}
      </div>
      <p className="text-sm leading-6 text-gray-600">{description}</p>
    </div>
  );
}

type MarketingLink = {
  href: Route;
  label: string;
};

type MarketingSupportLinksProps = {
  heading: string;
  links: MarketingLink[];
};

export function MarketingSupportLinks({
  heading,
  links,
}: MarketingSupportLinksProps) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="text-xs font-bold uppercase text-gray-500"
        style={{ letterSpacing: "0.16em" }}
      >
        {heading}
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:border-saju-primary hover:text-saju-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saju-primary focus-visible:ring-offset-2"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
