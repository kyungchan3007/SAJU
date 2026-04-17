const zodiacList = [
  { emoji: "🐭", name: "쥐", hanja: "子" },
  { emoji: "🐮", name: "소", hanja: "丑" },
  { emoji: "🐯", name: "호랑이", hanja: "寅" },
  { emoji: "🐰", name: "토끼", hanja: "卯" },
  { emoji: "🐲", name: "용", hanja: "辰" },
  { emoji: "🐍", name: "뱀", hanja: "巳" },
  { emoji: "🐴", name: "말", hanja: "午" },
  { emoji: "🐐", name: "양", hanja: "未" },
  { emoji: "🐵", name: "원숭이", hanja: "申" },
  { emoji: "🐔", name: "닭", hanja: "酉" },
  { emoji: "🐶", name: "개", hanja: "戌" },
  { emoji: "🐷", name: "돼지", hanja: "亥" },
];

const steps = [
  { label: "1. 생년월일", active: true },
  { label: "2. 출생 시간", active: true },
  { label: "3. 성별", active: false },
  { label: "4. 완료", active: false },
];

const fieldClassName =
  "w-full rounded-xl border border-[rgba(170,132,238,0.32)] bg-[rgba(13,9,26,0.62)] px-4 py-3.5 text-sm text-[rgba(248,241,255,0.95)] outline-none transition placeholder:text-[rgba(211,186,247,0.55)] focus:border-[rgba(239,200,255,0.9)] focus:ring-2 focus:ring-[rgba(182,120,255,0.28)]";

export function SajuInputForm() {
  return (
    <section
      className="card-saju-primary rounded-[2rem] border p-7"
      style={{
        borderColor: "rgba(170,132,238,0.34)",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* 스테퍼 */}
      <div className="mb-[18px] flex flex-wrap gap-2.5">
        {steps.map((step) => (
          <span
            key={step.label}
            className={`rounded-full border px-3.5 py-2 text-xs font-bold transition ${
              step.active
                ? "border-[rgba(178,121,255,0.3)] bg-[rgba(178,121,255,0.12)] text-violet-300"
                : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[rgba(167,181,227,0.6)]"
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>

      {/* 제목 */}
      <h3 className="text-2xl font-bold tracking-tight text-[rgba(252,247,255,0.96)]">
        당신의 사주를 입력해주세요
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[rgba(228,205,255,0.72)]">
        복잡한 용어 없이 간단한 입력만으로 오늘의 기운 분석을 시작할 수
        있습니다.
      </p>

      {/* 입력 폼 */}
      <form className="mt-5">
        <div className="grid grid-cols-2 gap-3.5">
          {/* 출생 연도 */}
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[rgba(167,181,227,0.9)]">
              출생 연도
            </span>
            <select
              className={`${fieldClassName} cursor-pointer appearance-none`}
            >
              {Array.from({ length: 100 }, (_, i) => 2005 - i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>

          {/* 출생 월/일 */}
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[rgba(167,181,227,0.9)]">
              출생 월 / 일
            </span>
            <input
              type="text"
              placeholder="03 / 14"
              className={fieldClassName}
            />
          </label>

          {/* 양력/음력 */}
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[rgba(167,181,227,0.9)]">
              양력 / 음력
            </span>
            <select
              className={`${fieldClassName} cursor-pointer appearance-none`}
            >
              <option value="solar">양력</option>
              <option value="lunar">음력</option>
              <option value="lunar-leap">음력 (윤달)</option>
            </select>
          </label>

          {/* 출생 시간 */}
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[rgba(167,181,227,0.9)]">
              출생 시간
            </span>
            <select
              className={`${fieldClassName} cursor-pointer appearance-none`}
            >
              <option value="">시간 미상</option>
              <option value="00:00">오전 00:00 (자시)</option>
              <option value="01:00">오전 01:00</option>
              <option value="02:00">오전 02:00</option>
              <option value="03:00">오전 03:00</option>
              <option value="04:00">오전 04:00</option>
              <option value="05:00">오전 05:00</option>
              <option value="06:00">오전 06:00</option>
              <option value="07:00">오전 07:00</option>
              <option value="08:00">오전 08:00</option>
              <option value="09:00">오전 09:00</option>
              <option value="09:30">오전 09:30</option>
              <option value="10:00">오전 10:00</option>
              <option value="11:00">오전 11:00</option>
              <option value="12:00">오후 12:00</option>
              <option value="13:00">오후 01:00</option>
              <option value="14:00">오후 02:00</option>
              <option value="15:00">오후 03:00</option>
              <option value="16:00">오후 04:00</option>
              <option value="17:00">오후 05:00</option>
              <option value="18:00">오후 06:00</option>
              <option value="19:00">오후 07:00</option>
              <option value="20:00">오후 08:00</option>
              <option value="21:00">오후 09:00</option>
              <option value="22:00">오후 10:00</option>
              <option value="23:00">오후 11:00</option>
            </select>
          </label>

          {/* 성별 */}
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[rgba(167,181,227,0.9)]">
              성별
            </span>
            <select
              className={`${fieldClassName} cursor-pointer appearance-none`}
            >
              <option value="female">여성</option>
              <option value="male">남성</option>
            </select>
          </label>

          {/* 시간 미상 여부 */}
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[rgba(167,181,227,0.9)]">
              시간 미상 여부
            </span>
            <select
              className={`${fieldClassName} cursor-pointer appearance-none`}
            >
              <option value="no">아니오</option>
              <option value="yes">예</option>
            </select>
          </label>
        </div>

        {/* 띠 표시 */}
        <div
          className="mt-4 flex items-center gap-3.5 rounded-[20px] p-4"
          style={{
            border: "1px solid rgba(178,121,255,0.25)",
            background: "rgba(178,121,255,0.08)",
          }}
        >
          <div
            className="grid h-[60px] w-[60px] shrink-0 place-items-center rounded-[18px] text-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(178,121,255,0.18), rgba(88,120,190,0.22))",
            }}
          >
            🐯
          </div>
          <div>
            <strong className="text-sm font-bold text-[rgba(252,247,255,0.96)]">
              1998년생 · 호랑이띠
            </strong>
            <p className="mt-1 text-xs text-[rgba(228,205,255,0.72)]">
              프로필 카드, 결과 리포트에서 동일한 아이콘으로 표시됩니다.
            </p>
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-4 flex gap-3">
          <button type="button" className="btn-saju btn-saju-secondary">
            이전
          </button>
          <button type="submit" className="btn-saju btn-saju-primary flex-1">
            오늘의 기운 보기
          </button>
        </div>
      </form>

      {/* 12간지 그리드 */}
      <div className="mt-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[rgba(167,181,227,0.7)]">
          12 Zodiac Icons
        </p>
        <div className="grid grid-cols-6 gap-3">
          {zodiacList.map((z) => (
            <div
              key={z.name}
              className="flex flex-col items-center gap-1.5 rounded-[22px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-3 text-center"
            >
              <div
                className="grid h-[48px] w-[48px] place-items-center rounded-[18px] text-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(178,121,255,0.18), rgba(88,120,190,0.22))",
                }}
              >
                {z.emoji}
              </div>
              <strong className="text-xs font-semibold text-[rgba(252,247,255,0.9)]">
                {z.name}
              </strong>
              <span className="text-[11px] text-[rgba(167,181,227,0.7)]">
                {z.hanja}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
