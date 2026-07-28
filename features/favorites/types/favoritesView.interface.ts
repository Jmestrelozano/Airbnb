import { SafeListing, TUser } from "@/shared/lib/types/global";

export interface FavoritesViewProps {
  listings: SafeListing[];
  currentUser?: TUser;
}
