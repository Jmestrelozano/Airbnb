"use client";

import { Container } from "@/shared/ui/Container";
import { NavbarProps } from "@/features/navigation/types/navbar.interface";

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  search,
  userMenu,
  categories,
  isScrolled = false,
}) => {
  return (
    <div
      className={`
        fixed w-full bg-white z-20
        transition-shadow duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isScrolled ? "shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]" : ""}
      `}
    >
      <div
        className={`
          border-b border-neutral-200
          transition-[padding] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isScrolled ? "py-2 md:py-3" : "py-3 md:py-4"}
        `}
      >
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <div className="hidden md:block shrink-0">{logo}</div>
            <div className="flex-1 min-w-0 md:flex-none md:mx-auto w-full flex justify-center">
              {search}
            </div>
            <div className="hidden sm:block shrink-0">{userMenu}</div>
          </div>
        </Container>
      </div>
      {categories}
    </div>
  );
};
