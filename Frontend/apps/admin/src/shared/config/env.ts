import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .default("")
  .refine((value) => value === "" || /^https?:\/\//.test(value), {
    message: "Expected an http(s) URL or an empty value.",
  });

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: optionalUrl,
});

const serverEnvSchema = z.object({
  BACKEND_API_BASE_URL: optionalUrl,
  CLOUDFLARE_API_TOKEN: z.string().trim().default(""),
  CLOUDFLARE_ZONE_ID: z.string().trim().default(""),
  CLOUDFLARE_ACCOUNT_ID: z.string().trim().default(""),
});

export const env = publicEnvSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

export function getServerEnv() {
  return serverEnvSchema.parse({
    BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL,
    CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
    CLOUDFLARE_ZONE_ID: process.env.CLOUDFLARE_ZONE_ID,
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
  });
}
