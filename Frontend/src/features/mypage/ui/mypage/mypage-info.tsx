import type { InfoItem } from "../../type/types";

type Props = { items: InfoItem[] };

const INFO_ICONS = [
  /* 공지사항 */
  <svg
    key="notice"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
  >
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>,
  /* 고객센터 */
  <svg
    key="help"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>,
  /* 추천하기 */
  <svg
    key="recommend"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
  >
    <rect height="14" rx="2" width="18" x="3" y="8" />
    <path d="M12 5V3" />
    <path d="M7 12V8" />
    <path d="M17 12V8" />
    <path d="M7 21a2 2 0 0 1-2-2V8" />
    <path d="M17 21a2 2 0 0 0 2-2V8" />
    <path d="M12 8a3 3 0 1 0 0-6 3 3 0 1 0 0 6Z" />
  </svg>,
  /* 점신 상담사 입점하기 */
  <svg
    key="partner"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="16" x2="22" y1="11" y2="11" />
  </svg>,
];

const ChevronRight = () => (
  <svg
    className="text-slate-300 transition-colors group-hover:text-[#5956E9]"
    fill="none"
    height="14"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="14"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export function MypageInfo({ items }: Props) {
  return (
    <section
      className="flex flex-col border border-slate-100 bg-white p-8 shadow-sm"
      style={{ borderRadius: 24 }}
    >
      <h3 className="mb-6 text-lg font-bold text-slate-800">안내</h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.label}>
            {i > 0 && <hr className="mb-4 border-slate-50" />}
            <a
              href={item.href}
              className="group flex cursor-pointer items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "#F0EEFF", color: "#5956E9" }}
                >
                  {INFO_ICONS[i] ?? null}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{item.label}</h4>
                  {item.desc && (
                    <p className="text-[10px] text-slate-400">{item.desc}</p>
                  )}
                </div>
              </div>
              <ChevronRight />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
