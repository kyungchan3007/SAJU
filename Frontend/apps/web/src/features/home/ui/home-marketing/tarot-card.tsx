import type { HomeTarotCard } from "@/features/home/type/type";

export function TarotCard({ card }: { card: HomeTarotCard }) {
  return (
    <div
      className="flex h-32 w-20 flex-col items-center justify-center gap-2 rounded-xl text-center shadow-lg"
      style={{ background: card.bg }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <div className="text-xs font-semibold text-white">{card.label}</div>
    </div>
  );
}
