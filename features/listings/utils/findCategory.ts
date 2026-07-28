import { categories } from "@/features/navigation/utils/categories";

export function findCategory(label: string) {
  return categories.find((item) => item.label === label);
}
