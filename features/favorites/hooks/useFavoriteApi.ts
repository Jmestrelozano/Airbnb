"use client";

import { useCallback } from "react";
import axios from "axios";

export const useFavoriteApi = () => {
  const addFavorite = useCallback((listingId: string) => {
    return axios.post(`/api/favorites/${listingId}`);
  }, []);

  const removeFavorite = useCallback((listingId: string) => {
    return axios.delete(`/api/favorites/${listingId}`);
  }, []);

  return { addFavorite, removeFavorite };
};
