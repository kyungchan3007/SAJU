function StepCard({
  href,
  title,
  desc,
  icon,
  iconBg,
  hoverBorder,
}: {
  href: string;
  title: string;
  desc: string;
  icon: string;
  iconBg: string;
  hoverBorder: string;
}) {
  return (
    <a
      href={href}
      className={`group relative flex h-28 flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md ${hoverBorder}`}
    >
      <div>
        <h3 className="mb-0.5 text-[13px] font-bold text-gray-900 transition group-hover:text-[#5956E9]">
          {title}
        </h3>
        <p className="whitespace-pre-line text-[11px] text-gray-400">{desc}</p>
      </div>
      <div
        className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full text-[16px] ${iconBg}`}
      >
        {icon}
      </div>
    </a>
  );
}

export function JeongtongsajuNextSteps() {
  return (
    <div>
      <div className="mb-4 flex items-baseline gap-2 px-1">
        <h2 className="text-[16px] font-bold text-gray-900">다음 단계</h2>
        <span className="text-[13px] text-gray-400">
          더 깊이 있는 분석과 인사이트를 확인해보세요.
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StepCard
          href="/compatibility"
          title="궁합 보기"
          desc={"내게 잘 맞는 인연은\n어떤 사람일까요?"}
          icon="💜"
          iconBg="bg-purple-100"
          hoverBorder="hover:border-purple-200"
        />
        <StepCard
          href="/mypage/year-fortune"
          title="올해 운세 보기"
          desc={"나의 운세와\n기회를 확인해보세요."}
          icon="📅"
          iconBg="bg-blue-100"
          hoverBorder="hover:border-blue-200"
        />
        <StepCard
          href="/saju/result"
          title="상세 성향 리포트"
          desc={"성격, 연애, 직업 성향을\n더 자세히 분석해드려요."}
          icon="📋"
          iconBg="bg-green-100"
          hoverBorder="hover:border-green-200"
        />
        <StepCard
          href="/mypage"
          title="PDF 리포트 저장"
          desc={"나의 사주 리포트를\nPDF로 저장해보세요."}
          icon="📥"
          iconBg="bg-orange-100"
          hoverBorder="hover:border-orange-200"
        />
      </div>
    </div>
  );
}
