"use client";

import React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const Logo = () => {
  const router = useRouter();

  return (
    <Image loading="lazy"
      onClick={() => router.push("/")}
      alt="logo"
      className="hidden md:block cursor-pointer"
      height={100}
      width={100}
      src={"/assets/images/logo.png"}
    />
  );
};
