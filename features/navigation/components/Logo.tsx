"use client";

import Image from "next/image";
import { LogoProps } from "@/features/navigation/types/logo.interface";

export const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <Image
      loading="lazy"
      onClick={onClick}
      alt="logo"
      className="hidden md:block cursor-pointer"
      height={100}
      width={100}
      src={"/assets/images/logo.png"}
    />
  );
};
