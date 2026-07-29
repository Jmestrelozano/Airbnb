"use client";

import React from "react";
import { ContainerProps } from "@/shared/ui/types/container";

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-6">
      {children}
    </div>
  );
};
