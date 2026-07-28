"use client";

import { RentModal } from "@/features/listings/components/RentModal";
import { useRentModal } from "@/features/listings/hooks/useRentModal";

export const RentModalView = () => {
  const viewModel = useRentModal();

  return <RentModal {...viewModel} />;
};
