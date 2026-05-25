import { Button } from "@/shared/ui/button/button";
import type { MypageStats } from "../../type/types";

type Props = { stats: MypageStats };

export function MypageStatsCard({ stats }: Props) {
  return (
    <div className="card-saju-primary overflow-hidden">
      <div className="flex items-center justify-between border-b border-black/10 p-5">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-[#0d0d0d]/50">복주머니</span>
          <span className="flex items-center gap-1 text-2xl font-bold text-[#0d0d0d]">
            {stats.luckyBag}
            <span className="text-sm text-[#0d0d0d]/30">›</span>
          </span>
        </div>
        <button
          className="btn-saju rounded-sm border-2 border-black bg-yellow-300 px-5 py-2 text-sm font-bold text-[#0d0d0d]"
          style={{ boxShadow: "3px 3px 0 #0d0d0d" }}
        >
          모으기
        </button>
      </div>

      <div className="flex items-center justify-between p-5">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-[#0d0d0d]/50">보유 코인</span>
          <span className="flex items-center gap-1 text-2xl font-bold text-[#0d0d0d]">
            {stats.coins}
            <span className="text-sm text-[#0d0d0d]/30">›</span>
          </span>
        </div>
        <Button size="sm" className="px-5">
          충전하기
        </Button>
      </div>
    </div>
  );
}
