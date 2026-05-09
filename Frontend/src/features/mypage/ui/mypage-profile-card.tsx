import { findZodiacByLabel } from "@/shared/model/zodiac/utils";
import type { MypageUser } from "../type/types";

type Props = { user: MypageUser };

export function MypageProfileCard({ user }: Props) {
  const zodiac = findZodiacByLabel(user.summaryZodiac);

  return (
    <div className="card-saju-primary flex items-center gap-4 p-5 lg:flex-col lg:py-8 lg:text-center">
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-black bg-[#0d0d0d] text-3xl lg:h-20 lg:w-20 lg:text-4xl"
        style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
      >
        {zodiac ? <span>{zodiac.emoji}</span> : user.summaryZodiac}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 lg:items-center">
        <span
          className="inline-block w-fit rounded-full border border-black bg-yellow-300 px-3 py-0.5 text-[11px] font-bold"
          style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
        >
          {/*{user.memberType}*/}
        </span>
        <span className="font-bold text-[#0d0d0d] lg:text-xl">
          {user.email}
        </span>
      </div>

      {/* 모바일: 우측 링크 */}
      <a
        href="/mypage/jeongtongsaju"
        className="shrink-0 text-xs text-[#0d0d0d]/50 underline hover:text-[#0d0d0d] lg:hidden"
      >
        만세력 보기
      </a>

      {/* 웹: 하단 버튼 */}
      <a
        href="/mypage/jeongtongsaju"
        className="btn-saju btn-saju-secondary hidden rounded-full px-5 py-1.5 text-xs lg:inline-block"
      >
        만세력 보기 →
      </a>
    </div>
  );
}
