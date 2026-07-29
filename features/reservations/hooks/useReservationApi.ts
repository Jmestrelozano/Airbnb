"use client";

import { useCallback } from "react";
import axios from "axios";

export const useReservationApi = () => {
  const deleteReservation = useCallback((id: string) => {
    return axios.delete(`/api/reservations/${id}`);
  }, []);

  return { deleteReservation };
};
