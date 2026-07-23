import { BookUser, CalendarDays, Download, Heart } from "lucide-react";

function StepCard({
  testId,
  href,
  title,
  desc,
  icon,
  iconBg,
  hoverBorder,
}: {
  testId?: string;
  href: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  iconBg: string;
  hoverBorder: string;
}) {
  return (
    <a
      href={href}
      data-testid={testId}
      className={`group relative flex h-28 flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md ${hoverBorder}`}
    >
      <div>
        <h3 className="mb-0.5 text-[13px] font-bold text-gray-900 transition group-hover:text-[#5956E9]">
          {title}
        </h3>
        <p className="whitespace-pre-line text-[11px] text-gray-600">{desc}</p>
      </div>
      <div
        className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full ${iconBg}`}
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
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StepCard
          href="/compatibility"
          title="궁합 보기"
          desc={"나와 잘 맞는 인연은\n어떤 흐름일까요?"}
          icon={<Heart size={16} className="text-purple-500" />}
          iconBg="bg-purple-100"
          hoverBorder="hover:border-purple-200"
        />
        <StepCard
          href="/mypage/year-fortune"
          title="올해 운세 보기"
          desc={"올해의 기회와\n주의할 흐름을 확인해보세요."}
          icon={<CalendarDays size={16} className="text-blue-500" />}
          iconBg="bg-blue-100"
          hoverBorder="hover:border-blue-200"
        />
        <StepCard
          testId="personality-report-link"
          href="/mypage/personality"
          title="상세 성향 리포트"
          desc={"성격, 연애, 직업 성향을\n한 번에 정리해드려요."}
          icon={<BookUser size={16} className="text-green-600" />}
          iconBg="bg-green-100"
          hoverBorder="hover:border-green-200"
        />
        <StepCard
          href="/mypage"
          title="PDF 리포트 준비"
          desc={"내 사주 리포트를\nPDF로 다시 모아볼 수 있어요."}
          icon={<Download size={16} className="text-orange-500" />}
          iconBg="bg-orange-100"
          hoverBorder="hover:border-orange-200"
        />
      </div>
    </div>
  );
}
