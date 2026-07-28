"use client";

import { Suspense } from "react";

import { Navbar } from "@/features/navigation/components/Navbar";
import { LogoView } from "@/features/navigation/LogoView";
import { UserMenuView } from "@/features/navigation/UserMenuView";
import { CategoriesView } from "@/features/navigation/CategoriesView";
import { SearchView } from "@/features/search/SearchView";
import { UserProps } from "@/shared/lib/types/global";

export const NavbarView: React.FC<UserProps> = ({ currentUser }) => {
  return (
    <Navbar
      logo={<LogoView />}
      search={
        <Suspense fallback={<div className="h-12 w-full max-w-[400px]" />}>
          <SearchView />
        </Suspense>
      }
      userMenu={<UserMenuView currentUser={currentUser} />}
      categories={
        <Suspense fallback={null}>
          <CategoriesView />
        </Suspense>
      }
    />
  );
};
