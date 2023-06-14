import { SafeListing, SafeReservation, SafeUser, TUser } from "../global";

export interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: TUser;
}
