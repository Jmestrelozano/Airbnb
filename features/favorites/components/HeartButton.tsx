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
      className="relative hover:scale-110 transition cursor-pointer drop-shadow-md"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-airbnb" : "fill-black/50"}
      />
    </div>
  );
};
