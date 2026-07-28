"use client";

import { usePendingDelete } from "@/shared/hooks/usePendingDelete";
import { useListingApi } from "@/features/listings/hooks/useListingApi";

export const useProperties = () => {
  const { deleteListing } = useListingApi();
  const { deletingId, onDelete } = usePendingDelete({
    deleteFn: deleteListing,
    successMessage: "Listing deleted",
  });

  return { deletingId, onDelete };
};
