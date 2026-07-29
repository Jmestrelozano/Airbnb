import qs from "query-string";
import { formatISO } from "date-fns";
import { Range } from "react-date-range";
import { CountrySelectValue } from "@/shared/lib/types/global";

type BuildSearchQueryUrlParams = {
  paramsString?: string | null;
  location?: CountrySelectValue;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  dateRange: Range;
};

export function buildSearchQueryUrl({
  paramsString,
  location,
  guestCount,
  roomCount,
  bathroomCount,
  dateRange,
}: BuildSearchQueryUrlParams) {
  const currentQuery = paramsString ? qs.parse(paramsString) : {};

  const updatedQuery: Record<string, string | number | undefined> = {
    ...currentQuery,
    locationValue: location?.value,
    guestCount,
    roomCount,
    bathroomCount,
  };

  if (dateRange.startDate && dateRange.endDate) {
    updatedQuery.startDate = formatISO(dateRange.startDate);
    updatedQuery.endDate = formatISO(dateRange.endDate);
  }

  return qs.stringifyUrl(
    {
      url: "/",
      query: updatedQuery,
    },
    { skipNull: true }
  );
}
