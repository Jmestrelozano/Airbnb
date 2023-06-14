"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

//import useFavorite from "@/app/hooks/useFavorite";
import { HeartButtonProps } from "@/app/interfaces";

export const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  //   const { hasFavorited, toggleFavorite } = useFavorite({
  //     listingId,
  //     currentUser,
  //   });

  return (
    <div
      onClick={undefined}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={false ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};
