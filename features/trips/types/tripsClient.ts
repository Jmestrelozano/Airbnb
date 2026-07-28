import { SafeReservation, TUser } from "@/shared/lib/types/global";

export interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: TUser;
}
