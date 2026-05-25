import type { ResolvedNavItem } from "@/domain/navigation";
import Link from "next/link";

export function DesktopMainMenu({ items }: { items: ResolvedNavItem[] }) {
  return (
    <nav className="flex items-center" aria-label="주요 메뉴">
      {items.map((item) => (
        <Link
          key={item.href}
          href={{ pathname: item.href }}
          className={`px-4 py-1.5 text-sm font-semibold transition-colors ${
            item.active
              ? "border-b-2 border-[#5956E9] text-[#5956E9]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
