"use client";

import { Container } from "@/shared/ui/Container";
import { NavbarProps } from "@/features/navigation/types/navbar.interface";

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  search,
  userMenu,
  categories,
}) => {
  return (
    <div className="fixed w-full bg-white z-20">
      <div className="py-3 md:py-4 border-b border-neutral-200">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {logo}
            {search}
            {userMenu}
          </div>
        </Container>
      </div>
      {categories}
    </div>
  );
};
