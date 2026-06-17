"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const NAV_ITEMS = [
  { label: "대시보드", href: "/dashboard" },
  { label: "커뮤니티 기수", href: "/community" },
  { label: "알림 관리", href: "/notifications" },
  { label: "모니터링", href: "/monitoring" },
] as const;

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r border-surface-border bg-white px-4 py-6">
      <div className="mb-8 px-2 text-base font-bold text-saju-primary">
        사주 어드민
      </div>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-saju-light font-semibold text-saju-primary"
                  : "text-content-secondary hover:bg-surface-soft hover:text-content-primary",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
