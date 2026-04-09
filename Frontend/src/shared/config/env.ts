import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .default("")
  .refine((value) => value === "" || /^https?:\/\//.test(value), {
    message: "Expected an http(s) URL or an empty value.",
  });

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().trim().default("Saju Compass"),
  NEXT_PUBLIC_APP_URL: optionalUrl,
  NEXT_PUBLIC_KAKAO_MAP_APP_KEY: z.string().trim().default(""),
  NEXT_PUBLIC_PORTONE_STORE_ID: z.string().trim().default(""),
  NEXT_PUBLIC_TOSS_CLIENT_KEY: z.string().trim().default(""),
});

const serverEnvSchema = z.object({
  NEXTAUTH_URL: optionalUrl,
  NEXTAUTH_SECRET: z.string().trim().default("development-secret"),
  KAKAO_CLIENT_ID: z.string().trim().default(""),
  KAKAO_CLIENT_SECRET: z.string().trim().default(""),
  BACKEND_API_BASE_URL: optionalUrl,
  PORTONE_API_SECRET: z.string().trim().default(""),
  TOSS_SECRET_KEY: z.string().trim().default(""),
});

export const env = publicEnvSchema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_KAKAO_MAP_APP_KEY: process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY,
  NEXT_PUBLIC_PORTONE_STORE_ID: process.env.NEXT_PUBLIC_PORTONE_STORE_ID,
  NEXT_PUBLIC_TOSS_CLIENT_KEY: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY,
});

export function getServerEnv() {
  return serverEnvSchema.parse({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
    BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL,
    PORTONE_API_SECRET: process.env.PORTONE_API_SECRET,
    TOSS_SECRET_KEY: process.env.TOSS_SECRET_KEY,
  });
}
