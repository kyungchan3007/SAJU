import { NotifyForm } from "@/features/taro-coming-soon/ui/notify-form";

const FEATURES = [
  { icon: "✨", text: "사주 기반\n타로 리딩" },
  { icon: "🔮", text: "오늘의\n타로 카드" },
  { icon: "💫", text: "연애·진로\n타로 상담" },
];

export function TaroComingSoonSection() {
  return (
    <div className="flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[480px] rounded-[32px] border-[1.5px] border-[#EDE9FF] bg-white px-6 py-16 text-center shadow-[0_4px_32px_rgba(89,86,233,0.10)] sm:px-12">
        <span className="mb-6 block animate-float text-[64px]">
          🃏
        </span>

        <div className="mb-5 inline-block rounded-full bg-[#F0EEFF] px-4 py-1.5 text-[11px] font-extrabold tracking-widest text-[#5956E9]">
          COMING SOON
        </div>

        <h1 className="mb-4 text-[26px] font-black leading-snug tracking-tight text-gray-900">
          타로 서비스를
          <br />
          <span className="bg-gradient-to-r from-[#5956E9] to-violet-700 bg-clip-text text-transparent">
            준비하고 있어요
          </span>
        </h1>

        <div className="mx-auto mb-8 h-[3px] w-12 rounded-full bg-gradient-to-r from-[#5956E9] to-violet-700" />

        <p className="mb-8 text-[14px] leading-[1.8] text-gray-500">
          사주와 연결된 나만의 타로 리딩 서비스를
          <br />
          곧 선보일 예정이에요.
          <br />
          오픈 알림을 신청하면 가장 먼저 알려드릴게요!
        </p>

        <NotifyForm />

        <div className="mt-9 grid grid-cols-3 gap-3">
          {FEATURES.map(({ icon, text }) => (
            <div
              key={text}
              className="flex flex-col items-center gap-2 rounded-2xl bg-[#FAFAFA] px-3 py-4"
            >
              <span className="text-2xl">{icon}</span>
              <span className="whitespace-pre-line text-[11px] font-bold leading-snug text-[#5956E9]">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
