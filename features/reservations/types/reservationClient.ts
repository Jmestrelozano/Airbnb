import { SafeReservation, TUser } from "@/shared/lib/types/global";

export interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: TUser;
}
