"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/features/navigation/utils/categories";

export const useCategories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  return {
    categories,
    selectedCategory: category ?? null,
    isMainPage,
  };
};
