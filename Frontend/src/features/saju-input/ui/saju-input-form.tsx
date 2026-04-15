const fieldClassName =
  "w-full rounded-xl border border-[rgba(170,132,238,0.32)] bg-[rgba(13,9,26,0.62)] px-4 py-2.5 text-sm text-[rgba(248,241,255,0.95)] outline-none transition placeholder:text-[rgba(211,186,247,0.55)] focus:border-[rgba(239,200,255,0.9)] focus:ring-2 focus:ring-[rgba(182,120,255,0.28)]";

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
      {/* 헤더 */}
      <div className="mb-6">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(223,196,255,0.86)]">
          Saju Setup
        </p>
        <h2 className="text-xl font-semibold text-[rgba(252,247,255,0.96)]">
          당신의 사주를 알려주세요
        </h2>
        <p className="mt-1.5 text-sm text-[rgba(228,205,255,0.72)]">
          생년월일, 출생시간, 성별만 입력하면 오늘의 기운 분석을 시작할 수
          있습니다.
        </p>
      </div>

      {/* 입력 폼 */}
      <form className="grid gap-4 sm:grid-cols-2">
        {/* 생년월일 */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[rgba(228,205,255,0.78)]">
            생년월일
          </span>
          <input
            type="text"
            placeholder="1998-08-17"
            className={fieldClassName}
          />
        </label>

        {/* 출생시간 */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[rgba(228,205,255,0.78)]">
            출생시간
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

        {/* 양력/음력 */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[rgba(228,205,255,0.78)]">
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

        {/* 성별 */}
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[rgba(228,205,255,0.78)]">
            성별
          </span>
          <select
            className={`${fieldClassName} cursor-pointer appearance-none`}
          >
            <option value="female">여성</option>
            <option value="male">남성</option>
          </select>
        </label>

        {/* 추가 메모 */}
        <label className="col-span-full flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[rgba(228,205,255,0.78)]">
            추가 메모
          </span>
          <textarea
            rows={3}
            placeholder="시간을 모르면 모름으로 진행해도 됩니다."
            className={`${fieldClassName} resize-none`}
          />
        </label>

        {/* 버튼 */}
        <div className="col-span-full flex flex-wrap gap-3 pt-1">
          <button
            type="submit"
            // className="flex-1 rounded-full border-none bg-[linear-gradient(135deg,rgba(190,96,255,0.1)_0%,rgba(219,179,255,0.1)_52%,rgba(88,120,190,0)_100%)] px-6 py-2.5 text-sm font-semibold text-[rgba(245,248,255,0.96)] shadow-[0_10px_22px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md transition hover:bg-[linear-gradient(135deg,rgba(190,96,255,0.14)_0%,rgba(219,179,255,0.14)_52%,rgba(88,120,190,0.1)_100%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(233,30,140,0.30)]"
            className="btn-saju btn-saju-primary flex-1"
          >
            입력 완료하고 분석 시작
          </button>
          <button
            type="button"
            className="rounded-full border border-[rgba(170,132,238,0.38)] bg-[rgba(16,11,31,0.6)] px-6 py-2.5 text-sm font-medium text-[rgba(236,221,255,0.92)] transition hover:bg-[rgba(29,20,54,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(178,121,255,0.35)]"
          >
            임시 저장
          </button>
        </div>
      </form>
    </section>
  );
}
