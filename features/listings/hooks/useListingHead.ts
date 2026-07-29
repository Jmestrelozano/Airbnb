"use client";

import { useCountries } from "@/shared/hooks/useCountries";

export const useListingHead = ({ locationValue }: { locationValue: string }) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return {
    subtitle: `${location?.region}, ${location?.label}`,
  };
};
