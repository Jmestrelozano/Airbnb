"use client";

import { useCountries } from "@/shared/hooks/useCountries";

export const useListingInfo = (locationValue: string) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return { coordinates };
};
