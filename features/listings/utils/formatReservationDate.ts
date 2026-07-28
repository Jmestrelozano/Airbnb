import { format } from "date-fns";
import { SafeReservation } from "@/shared/lib/types/global";

export function formatReservationDate(
  reservation?: SafeReservation
): string | null {
  if (!reservation) {
    return null;
  }

  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);

  return `${format(start, "PP")} - ${format(end, "PP")}`;
}
