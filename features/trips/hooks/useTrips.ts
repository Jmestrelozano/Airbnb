"use client";

import { usePendingDelete } from "@/shared/hooks/usePendingDelete";
import { useReservationApi } from "@/features/reservations/hooks/useReservationApi";

export const useTrips = () => {
  const { deleteReservation } = useReservationApi();
  const { deletingId, onDelete: onCancel } = usePendingDelete({
    deleteFn: deleteReservation,
    successMessage: "Reservation cancelled",
  });

  return { deletingId, onCancel };
};
