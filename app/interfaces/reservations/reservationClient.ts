import { SafeReservation, TUser } from "../global";

export interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: TUser;
}
