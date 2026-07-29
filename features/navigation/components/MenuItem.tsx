"use client";

import { MenuItemProps } from "@/features/navigation/types/menuItem.interface";
import React from "react";

export const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        font-semibold
        text-neutral-800
      "
    >
      {label}
    </div>
  );
};
