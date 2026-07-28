import { SafeListing, SafeReservation, SafeUser, TUser } from "@/shared/lib/types/global";

export interface ListingViewProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: TUser;
}
