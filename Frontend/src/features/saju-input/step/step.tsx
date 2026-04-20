export type InputStepItem = {
  label: string;
  active: boolean;
};

type InputStepProps = {
  steps: InputStepItem[];
};

export default function InputStep({ steps }: InputStepProps) {
  return (
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
  );
}
