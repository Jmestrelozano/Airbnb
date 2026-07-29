import { eachDayOfInterval } from "date-fns";
import { SafeReservation } from "@/shared/lib/types/global";

export function getDisabledDates(reservations: SafeReservation[] = []): Date[] {
  return reservations.flatMap((reservation) =>
    eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate),
    })
  );
}
