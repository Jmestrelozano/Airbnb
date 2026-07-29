"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Range } from "react-date-range";

import { useStore } from "@/shared/lib/store";
import { Store } from "@/shared/lib/types/store";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { getDisabledDates } from "@/features/listings/utils/getDisabledDates";
import { getTotalPrice } from "@/features/listings/utils/getTotalPrice";
import { findCategory } from "@/features/listings/utils/findCategory";
import { useListingApi } from "@/features/listings/hooks/useListingApi";
import { ListingViewProps } from "@/features/listings/types/listingView.interface";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export const useListing = ({
  listing,
  reservations = [],
  currentUser,
}: ListingViewProps) => {
  const { onOpenLoginModal } = useStore((store: Store) => store);
  const router = useRouter();
  const { createReservation } = useListingApi();
  const { isLoading, run } = useAsyncAction();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const disabledDates = useMemo(
    () => getDisabledDates(reservations),
    [reservations]
  );

  const category = useMemo(
    () => findCategory(listing.category),
    [listing.category]
  );

  const totalPrice = useMemo(
    () => getTotalPrice(listing.price, dateRange),
    [dateRange, listing.price]
  );

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return onOpenLoginModal();
    }

    void run(
      () =>
        createReservation({
          totalPrice,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          listingId: listing.id,
        }),
      {
        successMessage: "Listing reserved!",
        onSuccess: () => {
          setDateRange(initialDateRange);
          router.push("/trips");
        },
      }
    );
  }, [
    totalPrice,
    dateRange,
    listing.id,
    router,
    currentUser,
    onOpenLoginModal,
    createReservation,
    run,
  ]);

  return {
    listing,
    currentUser,
    category,
    disabledDates,
    dateRange,
    setDateRange,
    totalPrice,
    isLoading,
    onCreateReservation,
  };
};
