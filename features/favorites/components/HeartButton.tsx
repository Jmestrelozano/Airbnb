"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { HeartButtonProps } from "@/features/favorites/types/heartButton.interface";

export const HeartButton: React.FC<HeartButtonProps> = ({
  hasFavorited,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};
