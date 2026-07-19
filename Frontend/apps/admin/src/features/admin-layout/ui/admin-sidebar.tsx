"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  CreditCard,
  ExternalLink,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const NAV_ITEMS = [
  { label: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { label: "커뮤니티 기수", href: "/community", icon: Users },
  { label: "결제 관리", href: "/payments", icon: CreditCard },
  { label: "알림 관리", href: "/notifications", icon: Bell },
  { label: "모니터링", href: "/monitoring", icon: Activity },
] as const;

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-surface-border bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-surface-border px-5">
        <span className="bg-saju-gradient bg-clip-text text-lg font-bold text-transparent">
          SAJU:ME
        </span>
        <span className="rounded-full bg-saju-tint px-2 py-0.5 text-xs font-semibold text-saju-primary">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 p-3 flex-1">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-content-subtle">
          메뉴
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href as Route}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-saju-light text-saju-primary shadow-saju-sm"
                  : "text-content-secondary hover:bg-surface-soft hover:text-content-primary",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-saju-primary" : "text-content-subtle",
                )}
              />
              {item.label}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-saju-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-surface-border p-3">
        <a
          href="https://saju-me.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-content-muted transition-colors hover:bg-surface-soft hover:text-saju-primary"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          실서비스 바로가기
        </a>
        <p className="mt-2 px-3 text-[10px] text-content-subtle">© 2025 SAJU:ME</p>
      </div>
    </aside>
  );
}
