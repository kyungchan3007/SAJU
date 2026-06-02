type ElementDisplay = {
  emoji: string;
  hanja: string;
  background: string;
  guide: string;
};

const DEFAULT_ELEMENT = "수";

const ELEMENT_DISPLAY_MAP: Record<string, ElementDisplay> = {
  목: {
    emoji: "🌿",
    hanja: "木",
    background: "#DCFCE7",
    guide: "자연과 숲의",
  },
  화: {
    emoji: "🔥",
    hanja: "火",
    background: "#FEE2E2",
    guide: "따뜻한 활력의",
  },
  토: {
    emoji: "⛰️",
    hanja: "土",
    background: "#FEF3C7",
    guide: "안정적인 대지의",
  },
  금: {
    emoji: "✨",
    hanja: "金",
    background: "#F3F4F6",
    guide: "맑고 정돈된",
  },
  수: {
    emoji: "💧",
    hanja: "水",
    background: "#DBEAFE",
    guide: "물과 자연의",
  },
};

type YongshinBannerProps = {
  strongestElement?: string;
  strongestScore?: number;
};

function getElementDisplay(element: string): ElementDisplay {
  return ELEMENT_DISPLAY_MAP[element] ?? ELEMENT_DISPLAY_MAP[DEFAULT_ELEMENT];
}

function normalizeElement(element: string | undefined): string {
  if (!element) {
    return DEFAULT_ELEMENT;
  }

  const matchedElement = Object.keys(ELEMENT_DISPLAY_MAP).find((key) =>
    element.includes(key),
  );

  return matchedElement ?? DEFAULT_ELEMENT;
}

function formatStrongestScore(score: number | undefined): string | null {
  if (score === undefined || !Number.isFinite(score)) {
    return null;
  }

  return `${Math.round(score)}점`;
}

export function YongshinBanner({
  strongestElement,
  strongestScore,
}: YongshinBannerProps) {
  const element = normalizeElement(strongestElement);
  const display = getElementDisplay(element);
  const scoreText = formatStrongestScore(strongestScore);

  return (
    <div
      className="flex gap-4 rounded-sm border-2 border-black bg-white p-4"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-black leading-none"
        style={{ background: display.background, boxShadow: "2px 2px 0 #0d0d0d" }}
      >
        <span className="text-2xl">{display.emoji}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#7a7570]">
          내 사주 기반 추천
        </p>
        <p className="font-['Jua',sans-serif] text-xl leading-none">
          {element}({display.hanja})의 기운
        </p>
        <p className="text-[11px] leading-relaxed text-[#7a7570]">
          용신이 {element}({display.hanja})인 닭띠 — {display.guide}
          <br />
          에너지가 운기를 높여줍니다
        </p>
        {strongestScore !== undefined && Number.isFinite(strongestScore) && (
          <div className="mt-1.5 flex items-center gap-2">
            <span className="shrink-0 text-[10px] font-bold text-[#7a7570]">기운 강도</span>
            <div
              className="h-2.5 flex-1 overflow-hidden rounded-sm border-2 border-black bg-[#F0EDE6]"
              style={{ boxShadow: "1px 1px 0 #0d0d0d" }}
            >
              <div
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, Math.round(strongestScore)))}%` }}
              />
            </div>
            <span className="shrink-0 text-[11px] font-bold">{scoreText}</span>
          </div>
        )}
        <div className="mt-1.5 rounded-sm border border-[#d4d0c8] bg-[#F0EDE6] px-3 py-2 text-[11px] leading-relaxed">
          💡 {display.guide} 장소가 나의 기운을 회복시켜줍니다. 아래
          키워드를 선택해 주변 추천 장소를 확인하세요.
        </div>
      </div>
    </div>
  );
}
