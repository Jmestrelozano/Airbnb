import { SafeReservation, TUser } from "../global";

export interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: TUser;
}
