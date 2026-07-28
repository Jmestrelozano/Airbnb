import { SafeListing, TUser } from "@/shared/lib/types/global";

export interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: TUser;
}
