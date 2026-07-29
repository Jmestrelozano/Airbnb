"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { buildCategoryQueryUrl } from "@/features/navigation/utils/buildCategoryQueryUrl";

export const useContainerCategoryBox = (label: string) => {
  const router = useRouter();
  const params = useSearchParams();

  const onClick = useCallback(() => {
    const url = buildCategoryQueryUrl(
      params?.toString() ?? null,
      label,
      params?.get("category") ?? null
    );

    router.push(url);
  }, [label, router, params]);

  return { onClick };
};
