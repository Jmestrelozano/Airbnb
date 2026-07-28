"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

export const useLogo = () => {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push("/");
  }, [router]);

  return { onClick };
};
