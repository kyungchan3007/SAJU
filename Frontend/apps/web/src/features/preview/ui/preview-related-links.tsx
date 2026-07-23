import Link from "next/link";
import type { Route } from "next";
import styles from "@/features/preview/ui/preview-page.module.css";

type PreviewRelatedLinksProps = {
  heading: string;
  links: Array<{ href: Route; label: string }>;
};

export function PreviewRelatedLinks({
  heading,
  links,
}: PreviewRelatedLinksProps) {
  return (
    <section className={`rounded-3xl border border-gray-100 bg-white p-6 ${styles.sectionCard}`}>
      <div className={`mb-3 text-xs font-bold uppercase text-gray-500 ${styles.eyebrow}`}>
        {heading}
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saju-primary focus-visible:ring-offset-2 ${styles.linkHover}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
