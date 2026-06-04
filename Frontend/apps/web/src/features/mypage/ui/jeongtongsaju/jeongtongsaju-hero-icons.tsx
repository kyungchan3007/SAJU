import {
  Droplets,
  Flame,
  Gem,
  Leaf,
  Mountain,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type StrengthTrendIconProps = {
  value: string;
};

type FiveElementBadgeIconProps = {
  ko: string;
  color: string;
};

const STRONG_LABEL = "\uC2E0\uAC15";
const METAL_LABEL = "\uAE08";
const WOOD_LABEL = "\uBAA9";
const EARTH_LABEL = "\uD1A0";
const FIRE_LABEL = "\uD654";
const WATER_LABEL = "\uC218";

export function StrengthTrendIcon({ value }: StrengthTrendIconProps) {
  const isStrong = value.includes(STRONG_LABEL);

  return isStrong ? (
    <TrendingUp size={13} color="#D97706" strokeWidth={2.5} />
  ) : (
    <TrendingDown size={13} color="#D97706" strokeWidth={2.5} />
  );
}

export function FiveElementBadgeIcon({
  ko,
  color,
}: FiveElementBadgeIconProps) {
  const props = { size: 14, color, strokeWidth: 2 };

  switch (ko) {
    case METAL_LABEL:
      return <Gem {...props} />;
    case WOOD_LABEL:
      return <Leaf {...props} />;
    case EARTH_LABEL:
      return <Mountain {...props} />;
    case FIRE_LABEL:
      return <Flame {...props} />;
    case WATER_LABEL:
      return <Droplets {...props} />;
    default:
      return <Gem {...props} />;
  }
}