
"use client";

import { useRouter } from "next/navigation";

import type { SajuFormValues } from "@/features/saju-input/type/type";

export const useSajuHooks = () => {
  const router = useRouter();

  const handleSubmitSaju = async (formValues: SajuFormValues) => {
    const response = await fetch("/api/saju", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    if (response.status === 401) {
      router.push("/login?next=/saju");
      return;
    }
  };

  return {
    handleSubmitSaju,
  };
};
