"use client";

import { useCallback } from "react";
import axios from "axios";
import { FieldValues } from "react-hook-form";

type CreateReservationPayload = {
  totalPrice: number;
  startDate?: Date;
  endDate?: Date;
  listingId: string;
};

export const useListingApi = () => {
  const createListing = useCallback((data: FieldValues) => {
    return axios.post("/api/listings", data);
  }, []);

  const createReservation = useCallback((payload: CreateReservationPayload) => {
    return axios.post("/api/reservations", payload);
  }, []);

  const deleteListing = useCallback((id: string) => {
    return axios.delete(`/api/listings/${id}`);
  }, []);

  return { createListing, createReservation, deleteListing };
};
