"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  buildErrorPagePath,
  type ErrorPageCode,
} from "@/shared/lib/error-page";

type Props = {
  code: ErrorPageCode;
};

export function RedirectToError({ code }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.replace(buildErrorPagePath({ code }) as Route);
  }, [code, router]);

  return null;
}
