import { SafeReservation, TUser } from "@/shared/lib/types/global";

export interface TripsViewProps {
  reservations: SafeReservation[];
  currentUser?: TUser;
}
