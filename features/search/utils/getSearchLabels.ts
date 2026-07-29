import { differenceInDays } from "date-fns";

export function getLocationLabel(
  locationValue: string | null,
  resolveLabel: (value: string) => string | undefined
) {
  if (locationValue) {
    return resolveLabel(locationValue) ?? "Explora destinos";
  }

  return "Explora destinos";
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

    return `${diff} ${diff === 1 ? "noche" : "noches"}`;
  }

  return "Agrega fechas";
}

export function getGuestLabel(guestCount: string | null) {
  if (guestCount) {
    const count = Number(guestCount);
    return `${guestCount} ${count === 1 ? "huésped" : "huéspedes"}`;
  }

  return "¿Cuántos?";
}
