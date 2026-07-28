"use client";

import { Categories } from "@/features/navigation/components/Categories";
import { ContainerCategoryBoxView } from "@/features/navigation/ContainerCategoryBoxView";
import { useCategories } from "@/features/navigation/hooks/useCategories";

export const CategoriesView = () => {
  const { categories, selectedCategory, isMainPage } = useCategories();

  if (!isMainPage) {
    return null;
  }

  return (
    <Categories>
      {categories.map((item) => (
        <ContainerCategoryBoxView
          key={item.label}
          label={item.label}
          icon={item.icon}
          selected={selectedCategory === item.label}
        />
      ))}
    </Categories>
  );
};
