"use client";

import React from "react";
import { ContainerProps } from "@/app/interfaces";

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-10 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};
