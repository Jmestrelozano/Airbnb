import { SafeListing, TUser } from "@/shared/lib/types/global";

export interface PropertiesViewProps {
  listings: SafeListing[];
  currentUser?: TUser;
}
