import type { SajuHubCopy } from "@/features/saju-hub/model/copy";
import { Button } from "@/shared/ui";

type SajuHubCardProps = {
  copy: SajuHubCopy;
  onCommunityClick: () => void;
  onResultClick: () => void;
};

export function SajuHubCard({
  copy,
  onCommunityClick,
  onResultClick,
}: SajuHubCardProps) {
  return (
    <section className="mx-auto flex min-h-[calc(100dvh-96px)] w-full max-w-[520px] items-center px-5 py-10">
      <article className="w-full overflow-hidden rounded-[32px] border border-surface-border bg-white shadow-saju-lg">
        <div
          className="px-6 py-7 text-center"
          style={{ backgroundColor: copy.elementBackground }}
        >
          <div
            className="mx-auto mb-4 flex size-16 items-center justify-center rounded-3xl bg-white text-3xl shadow-saju-sm"
            aria-hidden="true"
          >
            {copy.elementEmoji}
          </div>
          <p className="text-sm font-bold" style={{ color: copy.elementColor }}>
            나에게 필요한 기운 · {copy.elementLabel}
          </p>
          <h1 className="mt-2 text-2xl font-black leading-tight text-content-primary">
            {copy.title}
          </h1>
          <p className="pt-2 text-sm font-medium leading-relaxed text-content-secondary">
            {copy.yongshinDescription.split(",").map((line) => (
              <span key={line} className="text-gray block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="space-y-6 px-6 py-7">
          <div className="bg-surface-muted space-y-3 rounded-3xl px-5 py-5 text-center">
            <p className="text-base font-semibold leading-relaxed text-content-primary">
              {copy.description}
            </p>
            <p className="text-sm font-medium leading-relaxed text-content-secondary">
              {copy.compatibilityDescription}
            </p>
            <p className="text-sm font-bold leading-relaxed text-content-primary">
              {copy.companionPrompt}
            </p>
          </div>

          <div className="grid gap-3">
            <Button
              className="h-12 rounded-2xl text-base"
              size="lg"
              onClick={onResultClick}
            >
              오늘의 운세 확인하기
            </Button>
            <Button
              className="h-12 rounded-2xl text-base"
              size="lg"
              variant="secondary"
              onClick={onCommunityClick}
            >
              커뮤니티 참가하기
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
}
