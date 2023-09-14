import { SafeListing, TUser } from "../global";

export interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: TUser;
}
