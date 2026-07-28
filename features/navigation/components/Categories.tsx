"use client";

import { Container } from "@/shared/ui/Container";
import { CategoriesProps } from "@/features/navigation/types/categories.interface";

export const Categories: React.FC<CategoriesProps> = ({ children }) => {
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {children}
      </div>
    </Container>
  );
};
