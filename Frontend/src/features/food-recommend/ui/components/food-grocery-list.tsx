import { ShoppingBasket } from "lucide-react";

type Props = {
  groceryList: string[];
};

/**
 * 오늘의 추천 식재료 카드.
 * "# 재료명" 스타일 태그.
 */
export function FoodGroceryList({ groceryList }: Props) {
  if (groceryList.length === 0) return null;

  return (
    <div
      className="rounded-[20px] px-5 py-5"
      style={{
        background: "white",
        border: "1px solid #F3F4F6",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}
    >
      <div className="mb-3 flex items-center gap-2">
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
          style={{ background: "#F0EEFF" }}
        >
          <ShoppingBasket size={13} color="#5956E9" />
        </div>
        <span className="text-[14px] font-bold text-gray-900">
          오늘 장봐야 한다면
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {groceryList.map((item) => (
          <span
            key={item}
            className="rounded-full px-4 py-1.5 text-[13px] font-bold"
            style={{ background: "#F0EEFF", color: "#5956E9" }}
          >
            # {item}
          </span>
        ))}
      </div>
    </div>
  );
}
