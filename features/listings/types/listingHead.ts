import { TUser } from "@/shared/lib/types/global";

export interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: TUser;
}
