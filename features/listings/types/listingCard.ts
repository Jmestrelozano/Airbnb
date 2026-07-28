import { SafeListing, SafeReservation, TUser } from "@/shared/lib/types/global";

export interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: TUser;
}
