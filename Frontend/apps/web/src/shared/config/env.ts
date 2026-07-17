import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .default("")
  .refine((value) => value === "" || /^https?:\/\//.test(value), {
    message: "Expected an http(s) URL or an empty value.",
  });

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z
    .string()
    .trim()
    .default("무료 사주 풀이, 내 사주 보기 | 사주 톡톡"),
  NEXT_PUBLIC_APP_URL: optionalUrl,
  NEXT_PUBLIC_APP_DES: z
    .string()
    .trim()
    .default(
      "사주궁합 무료로 확인하고, 오늘의 흐름과 관계 방향을 함께 살펴보세요. 운세·궁합·사주 해석 가이드까지, 지금 시작해보세요",
    ),
  NEXT_PUBLIC_KAKAO_MAP_KEY: z.string().trim().default(""),
  NEXT_PUBLIC_PORTONE_STORE_ID: z.string().trim().default(""),
  NEXT_PUBLIC_TOSS_CLIENT_KEY: z.string().trim().default(""),
  NEXT_PUBLIC_ADSENSE_CLIENT_ID: z.string().trim().default(""),
  NEXT_PUBLIC_ADSENSE_BLOG_SLOT: z.string().trim().default(""),
  NEXT_PUBLIC_ADSENSE_SAJU_LOADING_SLOT: z.string().trim().default(""),
});

const serverEnvSchema = z.object({
  KAKAO_REST_API_KEY: z.string().trim().default(""),
  BACKEND_API_BASE_URL: optionalUrl,
  PORTONE_API_SECRET: z.string().trim().default(""),
  TOSS_SECRET_KEY: z.string().trim().default(""),
});

export const env = publicEnvSchema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_APP_DES: process.env.NEXT_PUBLIC_APP_DES,
  NEXT_PUBLIC_KAKAO_MAP_KEY: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY,
  NEXT_PUBLIC_PORTONE_STORE_ID: process.env.NEXT_PUBLIC_PORTONE_STORE_ID,
  NEXT_PUBLIC_TOSS_CLIENT_KEY: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY,
  NEXT_PUBLIC_ADSENSE_CLIENT_ID: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
  NEXT_PUBLIC_ADSENSE_BLOG_SLOT: process.env.NEXT_PUBLIC_ADSENSE_BLOG_SLOT,
  NEXT_PUBLIC_ADSENSE_SAJU_LOADING_SLOT:
    process.env.NEXT_PUBLIC_ADSENSE_SAJU_LOADING_SLOT,
});

export function getServerEnv() {
  return serverEnvSchema.parse({
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL,
    PORTONE_API_SECRET: process.env.PORTONE_API_SECRET,
    TOSS_SECRET_KEY: process.env.TOSS_SECRET_KEY,
  });
}
