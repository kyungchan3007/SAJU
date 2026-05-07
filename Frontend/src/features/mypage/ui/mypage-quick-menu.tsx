import type { QuickMenuItem } from "../type/types";

type Props = { items: QuickMenuItem[] };

export function MypageQuickMenu({ items }: Props) {
  return (
    <div className="card-saju-primary p-4">
      <p className="mb-3 hidden text-[11px] font-semibold tracking-widest text-[#0d0d0d]/40 lg:block">
        빠른 메뉴
      </p>
      <div className="flex justify-around">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group flex flex-col items-center gap-1.5"
          >
            <div className="relative">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-sm border-2 border-black bg-[rgb(250_248_242)] text-xl transition group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
              >
                {item.icon}
              </div>
              {item.badge != null && (
                <span className="absolute -right-1.5 -top-1.5 min-w-[18px] rounded-full border border-black bg-pink-400 px-1 text-center text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium text-[#0d0d0d]">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
