"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { useCountries } from "@/shared/hooks/useCountries";
import { useStore } from "@/shared/lib/store";
import { Store } from "@/shared/lib/types/store";
import {
  getDurationLabel,
  getGuestLabel,
  getLocationLabel,
} from "@/features/search/utils/getSearchLabels";

export const useSearch = () => {
  const { onOpenSearchModal } = useStore((store: Store) => store);
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(
    () =>
      getLocationLabel(locationValue ?? null, (value) => getByValue(value)?.label),
    [locationValue, getByValue]
  );

  const durationLabel = useMemo(
    () => getDurationLabel(startDate ?? null, endDate ?? null),
    [startDate, endDate]
  );

  const guestLabel = useMemo(
    () => getGuestLabel(guestCount ?? null),
    [guestCount]
  );

  return {
    locationLabel,
    durationLabel,
    guestLabel,
    onOpen: onOpenSearchModal,
  };
};
