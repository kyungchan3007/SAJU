type Props = {
  currentStep: number;
  totalSteps: number;
  labels: string[];
};

export function StepProgress({ currentStep, totalSteps, labels }: Props) {
  return (
    <div className="mb-7 flex items-center">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={stepNum} className="relative flex flex-1 flex-col items-center gap-1.5">
            {stepNum < totalSteps && (
              <div className="absolute left-1/2 top-[14px] h-0.5 w-full bg-gray-200" />
            )}
            <div
              className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-extrabold transition-colors duration-300 ${
                isDone || isActive
                  ? "bg-[#5956E9] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {isDone ? "✓" : stepNum}
            </div>
            <span
              className={`text-[10px] font-semibold whitespace-nowrap ${
                isActive ? "text-[#5956E9]" : "text-gray-400"
              }`}
            >
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
