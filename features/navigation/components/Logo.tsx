"use client";

import Image from "next/image";
import { LogoProps } from "@/features/navigation/types/logo.interface";

export const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <Image
      onClick={onClick}
      alt="Airbnb"
      className="hidden md:block cursor-pointer"
      height={32}
      width={102}
      src={"/assets/images/logo.png"}
      priority
    />
  );
};
