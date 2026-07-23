import type { SajuSummaryItem } from "../../type/types";

type Props = { items: SajuSummaryItem[] };

export function MypageSajuSummary({ items }: Props) {
  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* 헤더 */}
      <div className="mb-6 flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: "#F0EEFF" }}
        >
          <svg
            fill="none"
            height="16"
            stroke="#5956E9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>
        </div>
        <h3 className="font-bold text-slate-800">나의 명식 요약</h3>
      </div>

      {/* 명식 리스트 */}
      <ul className="mb-8 space-y-4 text-sm">
        {items.map((item, i) => (
          <li
            key={item.label}
            className={
              i > 0 ? "border-t border-slate-50 pt-4 flex justify-between" : "flex justify-between"
            }
          >
            <span className="text-slate-500">{item.label}</span>
            <span className="font-bold text-slate-800">{item.value}</span>
          </li>
        ))}
      </ul>

      {/* 하단 버튼 */}
      <a
        href="/mypage/saju-manage"
        className="flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold transition hover:opacity-80"
        style={{ background: "#F0EEFF", color: "#5956E9" }}
      >
        사주 정보 관리 바로가기
        <svg
          fill="none"
          height="14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="14"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </a>
    </section>
  );
}
