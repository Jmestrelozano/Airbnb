"use client";

import React from "react";
import Image from "next/image";
import { AvatarProps } from "@/app/interfaces";

export const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src || "/assets/images/placeholder.jpg"}
      loading="lazy"
    />
  );
};
