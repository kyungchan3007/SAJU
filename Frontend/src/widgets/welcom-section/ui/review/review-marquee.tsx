const REVIEWS = [
  { name: "김민준", handle: "@minjun_k", avatar: "민", rating: 5, text: "사주 풀이가 너무 정확해서 소름 돋았어요. 오늘 하루 방향을 잡는 데 진짜 도움됐습니다." },
  { name: "이서연", handle: "@seoyeon_l", avatar: "서", rating: 5, text: "궁합 보러 친구랑 같이 했는데 결과가 너무 재밌었어요 ㅋㅋ 매일 들어오게 되는 앱" },
  { name: "박지호", handle: "@jiho_p", avatar: "지", rating: 4, text: "오늘의 흐름 보고 중요한 미팅 일정 잡았는데 잘 풀렸어요. 신기하게 맞더라고요." },
  { name: "최수아", handle: "@sua_c", avatar: "수", rating: 5, text: "UI가 너무 예쁘고 결과 해석도 쉽게 설명해줘서 좋아요. 부모님께도 추천했어요." },
  { name: "정도윤", handle: "@doyun_j", avatar: "도", rating: 5, text: "매일 아침 오늘의 운세 확인하는 게 루틴이 됐어요. 하루 시작이 달라지는 느낌!" },
  { name: "한예린", handle: "@yerin_h", avatar: "예", rating: 4, text: "사주 용어를 쉽게 풀어줘서 처음 써보는 저도 바로 이해했어요. 강추합니다." },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-sm ${i < count ? "text-black" : "text-black/20"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  const surname = review.name[0];
  const rest = review.name.slice(1);

  return (
    <div
      className="w-[240px] shrink-0 border-2 border-black bg-white p-3"
      style={{ boxShadow: "3px 3px 0 #000" }}
    >
      {/* 프로필 */}
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-black bg-black text-xs font-black text-white">
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-black leading-tight">
            {surname}
            <span className="blur-[3px] select-none">{rest}</span>
          </p>
          <p className="text-[10px] text-sketch-muted">{review.handle}</p>
        </div>
        <StarRating count={review.rating} />
      </div>

      {/* 후기 텍스트 */}
      <p className="text-[11px] leading-relaxed text-black/70">
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}

export function ReviewMarquee() {
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <div className="w-full overflow-hidden py-8">
      <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-sketch-muted">
        실제 사용자 후기
      </p>
      <div className="flex gap-4" style={{ animation: "marquee 30s linear infinite", width: "max-content" }}>
        {doubled.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
