import { IconType } from "react-icons";
import { SafeUser } from "@/shared/lib/types/global";

export interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

export type ListingInfoPresentationalProps = Omit<
  ListingInfoProps,
  "locationValue"
> & {
  coordinates?: number[];
};
