export type InputStepItem = {
  label: string;
  active: boolean;
};

type InputStepProps = {
  steps: InputStepItem[];
};

// 스텝별 색상 — active(진함) / inactive(연함)
const STEP_COLORS = [
  { activeBg: "#FEF3C7", activeBorder: "#D97706", inactiveBg: "#FFFBEB", inactiveBorder: "#FCD34D" },
  { activeBg: "#DBEAFE", activeBorder: "#2563EB", inactiveBg: "#EFF6FF", inactiveBorder: "#93C5FD" },
  { activeBg: "#D1FAE5", activeBorder: "#059669", inactiveBg: "#ECFDF5", inactiveBorder: "#6EE7B7" },
  { activeBg: "#FCE7F3", activeBorder: "#DB2777", inactiveBg: "#FDF2F8", inactiveBorder: "#F9A8D4" },
];

export default function InputStep({ steps }: InputStepProps) {
  return (
    <div className="mb-[18px] flex flex-wrap items-center gap-2">
      {steps.map((step, i) => {
        const color = STEP_COLORS[i] ?? STEP_COLORS[0];
        return (
          <span
            key={step.label}
            className="inline-flex items-center gap-1.5 border-2 px-3 py-1 text-xs font-bold transition-colors transition-shadow"
            style={
              step.active
                ? {
                    backgroundColor: color.activeBg,
                    borderColor: color.activeBorder,
                    color: color.activeBorder,
                    boxShadow: `2px 2px 0 ${color.activeBorder}`,
                  }
                : {
                    backgroundColor: color.inactiveBg,
                    borderColor: color.inactiveBorder,
                    color: color.inactiveBorder,
                  }
            }
          >
            <span
              className="flex h-3.5 w-3.5 shrink-0 items-center justify-center border text-[9px] font-black"
              style={
                step.active
                  ? { borderColor: color.activeBorder, color: color.activeBorder }
                  : { borderColor: color.inactiveBorder, color: color.inactiveBorder }
              }
            >
              {i + 1}
            </span>
            {step.label}
          </span>
        );
      })}
    </div>
  );
}
