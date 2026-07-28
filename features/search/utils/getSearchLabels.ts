import { differenceInDays } from "date-fns";

export function getLocationLabel(
  locationValue: string | null,
  resolveLabel: (value: string) => string | undefined
) {
  if (locationValue) {
    return resolveLabel(locationValue) ?? "Anywhere";
  }

  return "Anywhere";
}

export function getDurationLabel(
  startDate: string | null,
  endDate: string | null
) {
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let diff = differenceInDays(end, start);

    if (diff === 0) {
      diff = 1;
    }

    return `${diff} Days`;
  }

  return "Any Week";
}

export function getGuestLabel(guestCount: string | null) {
  if (guestCount) {
    return `${guestCount} Guests`;
  }

  return "Add Guests";
}
