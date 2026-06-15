import { normalizeDailyEnergyResponse } from "@/entities/saju/server/normalizeDailyEnergyResponse";
import { describe, expect, it } from "vitest";

describe("normalizeDailyEnergyResponse", () => {
  it("keeps camelCase daily energy responses", () => {
    expect(
      normalizeDailyEnergyResponse({
        targetDate: "2026-06-15",
        todayScore: 82,
        goodTime: "오전",
        mood: "차분한 집중",
        dailyMessage: "흐름이 안정적이에요.",
        goodActions: ["정리"],
        avoidActions: ["무리"],
        avoidFlows: ["충동"],
        recommendPlaces: ["공원"],
        weakElement: "water",
        fiveElements: { 목: 20, water: 10 },
      }),
    ).toEqual({
      targetDate: "2026-06-15",
      todayScore: 82,
      goodTime: "오전",
      mood: "차분한 집중",
      dailyMessage: "흐름이 안정적이에요.",
      goodActions: ["정리"],
      avoidActions: ["무리"],
      avoidFlows: ["충동"],
      recommendPlaces: ["공원"],
      weakElement: "water",
      fiveElements: { 목: 20, water: 10 },
    });
  });

  it("normalizes nested snake_case daily responses", () => {
    expect(
      normalizeDailyEnergyResponse({
        saju: { id: 1 },
        daily: {
          target_date: "2026-06-15",
          today_score: 91,
          good_time: "오후",
          mood: "활기",
          daily_message: "좋은 흐름이에요.",
          good_actions: ["산책"],
          avoid_actions: ["과로"],
          avoid_flows: ["급한 결정"],
          recommend_places: ["카페"],
          weak_element: "fire",
          five_elements: { wood: 30, fire: 40, ignored: "nope" },
        },
      }),
    ).toEqual({
      targetDate: "2026-06-15",
      todayScore: 91,
      goodTime: "오후",
      mood: "활기",
      dailyMessage: "좋은 흐름이에요.",
      goodActions: ["산책"],
      avoidActions: ["과로"],
      avoidFlows: ["급한 결정"],
      recommendPlaces: ["카페"],
      weakElement: "fire",
      fiveElements: { wood: 30, fire: 40 },
    });
  });
});
