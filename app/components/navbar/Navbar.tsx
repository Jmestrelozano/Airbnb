"use client";

import React from "react";

import { ContainerNavbar } from "../containers/ContainerNavbar";
import { Search } from "./Search";
import { UserMenu } from "./UserMenu";

import { Logo } from "./Logo";

import { UserProps } from "@/app/interfaces";
import { Categories } from "./Categories";

export const Navbar: React.FC<UserProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b
        "
      >
        <ContainerNavbar>
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
        </ContainerNavbar>
      </div>
      <Categories />
    </div>
  );
};
