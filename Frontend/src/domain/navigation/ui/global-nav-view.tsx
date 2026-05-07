import Link from "next/link";

import type { ResolvedNavItem } from "@/domain/navigation/model/nav-items";
import { UserCircle } from "lucide-react";

type GlobalNavViewProps = {
  isLoggedIn: boolean;
  mainItems: ResolvedNavItem[];
  mobileItems: ResolvedNavItem[];
  profileItem?: ResolvedNavItem;
};

export function GlobalNavView({
  isLoggedIn,
  mainItems,
  mobileItems,
  profileItem,
}: GlobalNavViewProps) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 hidden h-14 border-b-2 border-black/10 bg-[rgb(250,248,242)] md:block">
        <div className="container flex h-full items-center justify-between">
          <Link
            href={{ pathname: "/home" }}
            className="font-display text-lg font-black text-black"
          >
            사주이야기
          </Link>

          <nav className="flex items-center" aria-label="주요 메뉴">
            {mainItems.map((item) => (
              <Link
                key={item.href}
                href={{ pathname: item.href }}
                className={`px-4 py-1.5 text-sm font-semibold transition ${
                  item.active
                    ? "text-black"
                    : "text-black/40 hover:text-black/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="text-right">
            {isLoggedIn ? (
              <Link
                href={{ pathname: "/mypage" }}
                className={`text-sm font-semibold transition ${
                  profileItem?.active
                    ? "text-black"
                    : "text-black/40 hover:text-black/70"
                }`}
              >
                <UserCircle />
              </Link>
            ) : (
              <Link
                href={{ pathname: "/login" }}
                className="text-sm font-semibold text-black/40 transition hover:text-black/70"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t-2 border-black/10 bg-[rgb(250,248,242)] md:hidden"
        aria-label="하단 메뉴"
      >
        {mobileItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={{ pathname: item.href }}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition ${
                item.active ? "text-black" : "text-black/35 hover:text-black/60"
              }`}
            >
              <Icon size={22} strokeWidth={item.active ? 2.5 : 1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
