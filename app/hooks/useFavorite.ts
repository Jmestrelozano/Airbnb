import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useStore } from "../store/store";

import { IUseFavorite, Store } from "../interfaces";

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const { onOpenLoginModal } = useStore((store: Store) => store);

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return onOpenLoginModal();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, listingId, onOpenLoginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};
