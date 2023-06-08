"use client";

import React from "react";
import { ContainerNavbarProps } from "@/app/interfaces";

export const ContainerNavbar: React.FC<ContainerNavbarProps> = ({
  children,
}) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-10 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};
