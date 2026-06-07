import type { Route } from "next";
import { SajuInputForm } from "@/features/saju-input";

type SajuInputProps = {
  nextPath?: Route | null;
};

export function SajuInput({ nextPath }: SajuInputProps) {
  return <SajuInputForm nextPath={nextPath} />;
}
