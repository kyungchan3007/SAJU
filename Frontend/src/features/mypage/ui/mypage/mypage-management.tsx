import type { ManagementItem } from "../../type/types";

type Props = { items: ManagementItem[] };

export function MypageManagement({ items }: Props) {
  return (
    <div className="card-saju-primary overflow-hidden">
      <div className="border-b-2 border-black bg-[rgb(240_238_232)] px-5 py-3.5">
        <span className="font-bold text-[#0d0d0d]">관리</span>
      </div>
      <ul>
        {items.map((item, i) => (
          <li
            key={item.label}
            className={i < items.length - 1 ? "border-b border-black/10" : ""}
          >
            <a
              href={item.href}
              className="flex items-center gap-3.5 px-5 py-4 transition hover:bg-[rgb(240_238_232)]"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border-2 border-black bg-[rgb(250_248_242)] text-base"
                style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
              >
                {item.icon}
              </div>
              <span className="flex-1 text-sm font-semibold text-[#0d0d0d]">
                {item.label}
              </span>
              {item.sub && (
                <span className="rounded-full border border-black/20 bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-[#0d0d0d]/60">
                  {item.sub}
                </span>
              )}
              <span className="text-base text-[#0d0d0d]/30">›</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
