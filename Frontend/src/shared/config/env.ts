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
      "사주궁합 무료로 확인하고, 오늘의 방향까지 한번에 잡으세요. 내 사주에 맞는 오늘 가볼 곳을 AI가 추천해드립니다. 운세·궁합·장소 추천까지, 지금 시작해보세요",
    ),
  NEXT_PUBLIC_KAKAO_MAP_KEY: z.string().trim().default(""),
  NEXT_PUBLIC_PORTONE_STORE_ID: z.string().trim().default(""),
  NEXT_PUBLIC_TOSS_CLIENT_KEY: z.string().trim().default(""),
  NEXT_PUBLIC_ADSENSE_CLIENT_ID: z.string().trim().default(""),
  NEXT_PUBLIC_ADSENSE_SAJU_LOADING_SLOT: z.string().trim().default(""),
});

const serverEnvSchema = z.object({
  NEXTAUTH_URL: optionalUrl,
  NEXTAUTH_SECRET: z.string().trim().default("development-secret"),
  KAKAO_CLIENT_ID: z.string().trim().default(""),
  KAKAO_CLIENT_SECRET: z.string().trim().default(""),
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
  NEXT_PUBLIC_ADSENSE_SAJU_LOADING_SLOT:
    process.env.NEXT_PUBLIC_ADSENSE_SAJU_LOADING_SLOT,
});

export function getServerEnv() {
  return serverEnvSchema.parse({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
    KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
    BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL,
    PORTONE_API_SECRET: process.env.PORTONE_API_SECRET,
    TOSS_SECRET_KEY: process.env.TOSS_SECRET_KEY,
  });
}
