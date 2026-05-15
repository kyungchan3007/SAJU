import type { PartnerResponse } from "@/generated/api";
import { getPartnerAvatar } from "@/features/mypage/model/partner";

type Props = {
  partner: PartnerResponse;
};

export function CompatibilityResultHeader({ partner }: Props) {
  return (
    <div className="flex items-center justify-center px-5 pb-5 pt-6">
      <div className="flex flex-1 flex-col items-center gap-2">
        <div
          className="flex h-[68px] w-[68px] items-center justify-center rounded-xl border-2 border-black bg-[#FFF9C2] text-[30px]"
          style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
        >
          👤
        </div>
        <span className="font-display text-[15px]">나</span>
      </div>

      <div className="flex shrink-0 animate-heartbeat items-center justify-center px-3 text-[28px]">
        💞
      </div>

      <div className="flex flex-1 flex-col items-center gap-2">
        <div
          className="flex h-[68px] w-[68px] items-center justify-center rounded-xl border-2 border-black bg-[#F0EDE6] text-[30px]"
          style={{ boxShadow: "2px 2px 0 #0d0d0d" }}
        >
          {getPartnerAvatar(partner)}
        </div>
        <span className="font-display text-[15px]">{partner.name}</span>
      </div>
    </div>
  );
}
