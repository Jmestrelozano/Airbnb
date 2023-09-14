import { SafeListing, TUser } from "../global";

export interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser?: TUser;
}
