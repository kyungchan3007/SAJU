import type { HomeMarketingFeatureCard } from "@/features/home/type/type";

type FeatureCardGridProps = {
  cards: HomeMarketingFeatureCard[];
};

export function FeatureCardGrid({ cards }: FeatureCardGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card) => (
        <FeatureCard key={card.title} card={card} />
      ))}
    </div>
  );
}

function FeatureCard({ card }: { card: HomeMarketingFeatureCard }) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl p-4"
      style={{ background: "#F8F7FF" }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-lg"
        style={{ background: "#EEF" }}
      >
        {card.icon}
      </div>
      <div>
        <div className="mb-1 text-xs font-bold text-gray-900">{card.title}</div>
        <div className="text-xs leading-relaxed text-gray-400">{card.desc}</div>
      </div>
    </div>
  );
}
