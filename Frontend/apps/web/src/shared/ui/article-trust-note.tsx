import { SITE_BRAND } from "@/shared/lib/seo";

type ArticleTrustNoteProps = {
  kind: "입문 가이드" | "공개 운세 가이드" | "공개 예시";
  updatedAt: string;
  scope: string;
  highlights?: readonly string[];
};

export function ArticleTrustNote({
  kind,
  updatedAt,
  scope,
  highlights,
}: ArticleTrustNoteProps) {
  return (
    <section className="rounded-3xl border border-gray-100 bg-gray-50 px-5 py-6 md:px-7">
      <div className="flex flex-col gap-3 text-sm leading-7 text-gray-600">
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <span className="w-fit rounded-full bg-white px-3 py-1 text-[#5956E9]">
            {kind}
          </span>
          <span className="w-fit rounded-full bg-white px-3 py-1 text-gray-500">
            최종 수정일 <time dateTime={updatedAt}>{updatedAt}</time>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-black tracking-wide text-gray-500">
            콘텐츠 안내
          </p>
          <p>{SITE_BRAND} 공개 콘텐츠 기준 정리</p>
          <p>{scope}</p>
        </div>
        {highlights?.length ? (
          <div className="flex flex-col gap-2 rounded-2xl bg-white px-4 py-4">
            <p className="text-xs font-black tracking-wide text-gray-500">
              작성 기준
            </p>
            <ul className="flex list-disc flex-col gap-1 pl-4 text-sm leading-6 text-gray-600">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
