"use client";

import { useState } from "react";
import type { PartnerResponse } from "@/generated/api";
import { getPartnerAvatar } from "@/features/mypage/model/partner";
import { MAX_PARTNERS } from "@/features/mypage/hooks/usePartners";

type SelectedTarget = "me" | number;

type Props = {
  partners: PartnerResponse[];
  selectedTarget: SelectedTarget;
  onSelect: (target: SelectedTarget) => void;
  onAdd: () => void;
  onDelete: (partnerId: number, partnerName: string) => void;
  disabled?: boolean;
};

export function SajuCardList({
  partners,
  selectedTarget,
  onSelect,
  onAdd,
  onDelete,
  disabled,
}: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const total = partners.length + 1; // +1 for "me"
  const canAdd = total < MAX_PARTNERS;

  function handleCardClick(target: SelectedTarget) {
    if (isEditMode) return;
    onSelect(target);
  }

  function toggleEditMode() {
    setIsEditMode((prev) => !prev);
  }

  return (
    <div
      className="rounded-sm border-2 border-black bg-[#FDFCF8]"
      style={{ boxShadow: "4px 4px 0 #0d0d0d" }}
    >
      <div className="flex items-center justify-between border-b-2 border-black bg-[#F0EDE6] px-5 py-3 font-display text-[15px]">
        <span>
          등록된 사주{" "}
          <span className="font-sans text-[12px] font-semibold text-[#7a7570]">
            {total} / {MAX_PARTNERS}
          </span>
        </span>
        {partners.length > 0 && (
          <button
            type="button"
            onClick={toggleEditMode}
            className={`rounded-full border-2 border-black px-3 py-0.5 text-[12px] font-bold transition-all [box-shadow:2px_2px_0_#0d0d0d] ${
              isEditMode ? "bg-[#0d0d0d] text-white" : "bg-[#FDFCF8]"
            }`}
          >
            {isEditMode ? "완료" : "편집"}
          </button>
        )}
      </div>
      <div className="px-5 py-4">
        <div className="flex gap-2.5 overflow-x-auto pb-2 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* 나 카드 */}
          <SajuCard
            avatar="🧑"
            name="나"
            subLabel="(나)"
            isSelected={selectedTarget === "me"}
            isEditMode={false}
            isDeletable={false}
            onClick={() => handleCardClick("me")}
          />

          {/* 파트너 카드 */}
          {partners.map((partner) => (
            <SajuCard
              key={partner.id}
              avatar={getPartnerAvatar(partner)}
              name={partner.name ?? ""}
              isSelected={selectedTarget === partner.id}
              isEditMode={isEditMode}
              isDeletable={true}
              onClick={() => handleCardClick(partner.id!)}
              onDelete={() => onDelete(partner.id!, partner.name ?? "")}
            />
          ))}

          {/* 추가 카드 */}
          {!isEditMode && canAdd && (
            <button
              type="button"
              onClick={disabled ? undefined : onAdd}
              className="flex w-[80px] shrink-0 flex-col items-center gap-2"
            >
              <div
                className="flex h-[72px] w-[72px] items-center justify-center rounded-xl border-2 border-dashed border-[#d4d0c8] bg-[#FDFCF8] text-[26px] text-[#7a7570] transition-all hover:border-solid hover:border-black hover:bg-[#F0EDE6]"
                style={{ boxShadow: "none" }}
              >
                ＋
              </div>
              <span className="text-center text-[12px] font-bold text-[#7a7570]">
                추가
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

type SajuCardProps = {
  avatar: string;
  name: string;
  subLabel?: string;
  isSelected: boolean;
  isEditMode: boolean;
  isDeletable: boolean;
  onClick: () => void;
  onDelete?: () => void;
};

function SajuCard({
  avatar,
  name,
  subLabel,
  isSelected,
  isEditMode,
  isDeletable,
  onClick,
  onDelete,
}: SajuCardProps) {
  return (
    <div className="relative flex w-[80px] shrink-0 cursor-pointer flex-col items-center gap-2">
      {/* 삭제 버튼 */}
      {isEditMode && isDeletable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="absolute -left-2 -top-2 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-red-500 text-[11px] font-black text-white leading-none"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,.3)" }}
        >
          ✕
        </button>
      )}

      {/* 선택 체크 */}
      {isSelected && !isEditMode && (
        <div
          className="absolute -right-2 -top-2 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-[#0d0d0d] text-[11px] font-black text-white"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,.25)" }}
        >
          ✓
        </div>
      )}

      <button
        type="button"
        onClick={onClick}
        className={`flex h-[72px] w-[72px] items-center justify-center rounded-xl border-2 border-black text-[32px] transition-all ${
          isSelected && !isEditMode
            ? "bg-[#FFF9C2] [box-shadow:3px_3px_0_#0d0d0d]"
            : "bg-[#F0EDE6] [box-shadow:2px_2px_0_#0d0d0d] hover:-translate-x-px hover:-translate-y-px hover:[box-shadow:3px_3px_0_#0d0d0d]"
        } ${isEditMode && isDeletable ? "animate-wiggle" : ""}`}
      >
        {avatar}
      </button>

      <div className="text-center text-[12px] font-bold leading-tight text-[#0d0d0d]">
        {name}
        {subLabel && (
          <>
            <br />
            <span className="text-[10px] font-medium text-[#7a7570]">
              {subLabel}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
