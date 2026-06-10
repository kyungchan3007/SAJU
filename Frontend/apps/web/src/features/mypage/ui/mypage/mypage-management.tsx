import Link from "next/link";
import type { ReactNode } from "react";

import type { ManagementIconKey, ManagementItem } from "../../type/types";

type Props = { items: ManagementItem[] };

const MANAGEMENT_ICON_MAP: Record<ManagementIconKey, ReactNode> = {
  account: (
    <svg
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
    >
      <circle cx="18" cy="15" r="3" />
      <circle cx="9" cy="7" r="4" />
      <path d="M10 15H6a4 4 0 0 0-4 4v2" />
      <path d="m21.7 16.4-.9-.3" />
      <path d="m15.2 13.9-.9-.3" />
      <path d="m16.6 18.7.3-.9" />
      <path d="m19.1 12.2.3-.9" />
      <path d="m19.6 18.7-.4-1" />
      <path d="m16.8 12.3-.4-1" />
      <path d="m14.3 16.6 1-.4" />
      <path d="m20.7 13.4 1-.4" />
    </svg>
  ),
  saju: (
    <svg
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
    >
      <rect height="4" rx="1" ry="1" width="8" x="8" y="2" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l1-3.95 5.42-5.44Z" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5" />
      <path d="M4 15V6a2 2 0 0 1 2-2h2" />
    </svg>
  ),
};

const ChevronRight = () => (
  <svg
    className="text-slate-300 transition-colors group-hover:text-[#5956E9]"
    fill="none"
    height="16"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="16"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export function MypageManagement({ items }: Props) {
  return (
    <section
      className="flex flex-col border border-slate-100 bg-white p-8 shadow-sm"
      style={{ borderRadius: 24 }}
    >
      <h3 className="mb-6 text-lg font-bold text-slate-800">관리</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex cursor-pointer items-center justify-between rounded-2xl border border-transparent p-4 transition-all hover:border-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5956E9] focus-visible:ring-offset-2"
            style={{ background: "rgba(248,250,252,0.5)" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "#F0EEFF", color: "#5956E9" }}
              >
                {MANAGEMENT_ICON_MAP[item.icon]}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">{item.label}</h4>
                {item.desc && (
                  <p className="mt-0.5 text-[11px] text-slate-400">{item.desc}</p>
                )}
              </div>
            </div>
            <ChevronRight />
          </Link>
        ))}
      </div>
    </section>
  );
}
