"use client";

import { HeartButton } from "@/features/favorites/components/HeartButton";
import { useFavorite } from "@/features/favorites/hooks/useFavorite";
import { HeartButtonViewProps } from "@/features/favorites/types/heartButton.interface";

export const HeartButtonView: React.FC<HeartButtonViewProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <HeartButton hasFavorited={hasFavorited} onClick={toggleFavorite} />
  );
};
