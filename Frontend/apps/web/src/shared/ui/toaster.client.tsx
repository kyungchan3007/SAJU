"use client";

import { useEffect, useState } from "react";
import { Toaster } from "@saju/ui";

export function AppToaster() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <Toaster />;
}
