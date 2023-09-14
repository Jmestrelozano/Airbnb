"use client";

import React from "react";

import { Container } from "../containers/Container";
import { Search } from "./Search";
import { UserMenu } from "./UserMenu";
import { Categories } from "./Categories";

import { UserProps } from "@/app/interfaces";

import { Logo } from "./Logo";

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
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};
