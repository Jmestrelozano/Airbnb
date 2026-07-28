"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useStore } from "@/shared/lib/store";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { useFavoriteApi } from "@/features/favorites/hooks/useFavoriteApi";
import { IUseFavorite } from "@/features/favorites/types/useFavorite.interface";
import { Store } from "@/shared/lib/types/store";

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const { onOpenLoginModal } = useStore((store: Store) => store);
  const { addFavorite, removeFavorite } = useFavoriteApi();
  const { run } = useAsyncAction();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return onOpenLoginModal();
      }

      void run(
        () =>
          hasFavorited
            ? removeFavorite(listingId)
            : addFavorite(listingId),
        {
          successMessage: "Success",
          onSuccess: () => {
            router.refresh();
          },
        }
      );
    },
    [
      currentUser,
      hasFavorited,
      listingId,
      onOpenLoginModal,
      router,
      addFavorite,
      removeFavorite,
      run,
    ]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};
