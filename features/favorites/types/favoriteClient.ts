import { SafeListing, TUser } from "@/shared/lib/types/global";

export interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser?: TUser;
}
