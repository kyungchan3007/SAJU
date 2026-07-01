import Link from "next/link";
import type { Route } from "next";

type PreviewRelatedLinksProps = {
  heading: string;
  links: Array<{ href: Route; label: string }>;
};

export function PreviewRelatedLinks({
  heading,
  links,
}: PreviewRelatedLinksProps) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
        {heading}
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:border-[#5956E9] hover:text-[#5956E9]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
