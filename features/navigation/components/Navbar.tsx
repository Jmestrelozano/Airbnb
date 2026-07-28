"use client";

import React, { Suspense } from "react";

import { Container } from "@/shared/ui/Container";
import { Search } from "@/features/search/components/Search";
import { UserMenu } from "@/features/navigation/components/UserMenu";
import { Categories } from "@/features/navigation/components/Categories";

import { UserProps } from "@/shared/lib/types/global";

import { Logo } from "@/features/navigation/components/Logo";

export const Navbar: React.FC<UserProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b
        "
      >
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
          >
            <Logo />
            <Suspense fallback={<div className="h-12 w-full max-w-[400px]" />}>
              <Search />
            </Suspense>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Suspense fallback={null}>
        <Categories />
      </Suspense>
    </div>
  );
};
