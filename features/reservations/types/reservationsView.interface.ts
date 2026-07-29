import { SafeReservation, TUser } from "@/shared/lib/types/global";

export interface ReservationsViewProps {
  reservations: SafeReservation[];
  currentUser?: TUser;
}
