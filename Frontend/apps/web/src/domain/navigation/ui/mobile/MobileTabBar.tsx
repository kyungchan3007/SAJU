import Link from "next/link";
import type { Route } from "next";
import type { ResolvedNavItem, NavIconKey } from "@/domain/navigation";

export function MobileTabBar({ items }: { items: ResolvedNavItem[] }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-gray-100 bg-white md:hidden"
      aria-label="하단 메뉴"
      style={{ boxShadow: "0 -1px 3px rgba(0,0,0,0.04)" }}
    >
      {items.map((item) => {
        return (
          <Link
            key={item.label}
            href={item.href as Route}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-saju-primary ${
              item.active
                ? "text-[#5956E9]"
                : "text-gray-400 hover:text-gray-500"
            }`}
          >
            <NavIcon
              icon={item.icon}
              active={item.active}
              aria-hidden="true"
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function NavIcon({
  icon,
  active,
  ...props
}: {
  icon: NavIconKey;
  active: boolean;
} & React.SVGProps<SVGSVGElement>) {
  const strokeWidth = active ? 2.5 : 1.8;

  switch (icon) {
    case "sparkles":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
        </svg>
      );
    case "book-open":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H11a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H6.5A2.5 2.5 0 0 0 4 18.5z" />
          <path d="M20 6.5A2.5 2.5 0 0 0 17.5 4H13a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M12 20s-7-4.35-9-8.4C1.2 8.1 3.1 5 6.7 5c2.1 0 3.5 1.2 4.3 2.5C11.8 6.2 13.2 5 15.3 5 18.9 5 20.8 8.1 21 11.6 19 15.65 12 20 12 20z" />
        </svg>
      );
    case "wand":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M4 20L20 4" />
          <path d="M14 4h4v4" />
          <path d="M5 9H3" />
          <path d="M9 5V3" />
          <path d="M7.5 7.5L6 6" />
        </svg>
      );
    case "utensils":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M4 3v8" />
          <path d="M7 3v8" />
          <path d="M5.5 11v10" />
          <path d="M14 3v8a3 3 0 0 0 3 3h0V21" />
          <path d="M10 3v8" />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="7" r="3" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a3 3 0 0 1 0 5.74" />
        </svg>
      );
    case "user":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
      );
    case "help":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.1 9a3 3 0 1 1 5.2 2c-.75.8-1.8 1.34-1.8 2.5" />
          <path d="M12 17h.01" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
  }
}
