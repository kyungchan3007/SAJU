import { rankObjectValues } from "@/shared/utils/rankByValue";
import { describe, expect, it } from "vitest";

describe("rankObjectValues", () => {
  it("sorts numeric entries by descending value", () => {
    expect(
      rankObjectValues({
        metal: 40,
        wood: 10,
        water: 90,
      }),
    ).toEqual([
      { name: "water", pct: 90 },
      { name: "metal", pct: 40 },
      { name: "wood", pct: 10 },
    ]);
  });

  it("drops non-number entries", () => {
    expect(
      rankObjectValues({
        fire: 33,
        unknown: "10",
        earth: null,
      }),
    ).toEqual([{ name: "fire", pct: 33 }]);
  });

  it("returns cloned fallback when source is nullish", () => {
    const fallback = [{ name: "wood", pct: 1 }];
    const result = rankObjectValues(undefined, fallback);

    expect(result).toEqual(fallback);
    expect(result).not.toBe(fallback);
  });
});
