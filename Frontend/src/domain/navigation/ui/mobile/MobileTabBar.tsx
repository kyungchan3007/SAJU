import type { ResolvedNavItem } from "@/domain/navigation";
import Link from "next/link";

export function MobileTabBar({ items }: { items: ResolvedNavItem[] }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-gray-100 bg-white md:hidden"
      aria-label="하단 메뉴"
      style={{ boxShadow: "0 -1px 3px rgba(0,0,0,0.04)" }}
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={{ pathname: item.href }}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors ${
              item.active
                ? "text-[#5956E9]"
                : "text-gray-400 hover:text-gray-500"
            }`}
          >
            <Icon size={22} strokeWidth={item.active ? 2.5 : 1.8} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
