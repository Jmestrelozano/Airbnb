import { SafeListing, SafeReservation, SafeUser, TUser } from "@/shared/lib/types/global";

export interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: TUser;
}
