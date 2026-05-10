import type { InfoItem } from "../../type/types";

type Props = { items: InfoItem[] };

export function MypageInfo({ items }: Props) {
  return (
    <div className="card-saju-primary overflow-hidden">
      <div className="border-b-2 border-black bg-[rgb(240_238_232)] px-5 py-3.5">
        <span className="font-bold text-[#0d0d0d]">안내</span>
      </div>
      <ul>
        {items.map((item, i) => (
          <li
            key={item.label}
            className={i < items.length - 1 ? "border-b border-black/10" : ""}
          >
            <a
              href={item.href}
              className="flex items-center gap-3 px-5 py-4 transition hover:bg-[rgb(240_238_232)]"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="flex-1 text-sm font-medium text-[#0d0d0d]">
                {item.label}
              </span>
              <span className="text-base text-[#0d0d0d]/30">›</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
