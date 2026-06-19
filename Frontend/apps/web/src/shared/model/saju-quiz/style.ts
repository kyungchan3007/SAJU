import type {
  SajuQuizOption,
  SajuQuizOptionStyle,
} from "@/shared/model/saju-quiz/constants";

type GetSajuQuizOptionStyleParams = {
  answer: SajuQuizOption;
  option: SajuQuizOption;
  selected: SajuQuizOption | null;
};

export function getSajuQuizOptionStyle({
  answer,
  option,
  selected,
}: GetSajuQuizOptionStyleParams): SajuQuizOptionStyle {
  if (selected === null) {
    return {
      background: "#fff",
      borderColor: "#E5E7EB",
      color: "#1F2937",
      opacity: 1,
    };
  }

  if (option === answer) {
    return {
      background: "#F0EEFF",
      borderColor: "#5956E9",
      color: "#5956E9",
      opacity: 1,
    };
  }

  if (option === selected) {
    return {
      background: "#FFF1F2",
      borderColor: "#FECDD3",
      color: "#E11D48",
      opacity: 1,
    };
  }

  return {
    background: "#fff",
    borderColor: "#E5E7EB",
    color: "#9CA3AF",
    opacity: 0.5,
  };
}

export function getSajuQuizOptionBadgeStyle({
  answer,
  option,
  selected,
}: GetSajuQuizOptionStyleParams): Pick<
  SajuQuizOptionStyle,
  "background" | "color"
> {
  const isRevealedOption =
    selected !== null && (option === answer || option === selected);

  return {
    background:
      selected === null
        ? "#F3F4F6"
        : option === answer
          ? "#5956E9"
          : option === selected
            ? "#E11D48"
            : "#F3F4F6",
    color: isRevealedOption ? "#fff" : "#6B7280",
  };
}
