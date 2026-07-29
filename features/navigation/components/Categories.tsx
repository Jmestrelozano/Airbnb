"use client";

import { Container } from "@/shared/ui/Container";
import { CategoriesProps } from "@/features/navigation/types/categories.interface";

export const Categories: React.FC<CategoriesProps> = ({ children }) => {
  return (
    <Container>
      <div
        className="
          pt-3 pb-1
          flex flex-row items-center justify-between
          overflow-x-auto
          scrollbar-hide
          gap-1
        "
      >
        {children}
      </div>
    </Container>
  );
};
