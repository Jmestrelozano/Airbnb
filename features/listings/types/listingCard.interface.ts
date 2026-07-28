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

export interface ListingCardViewModel {
  imageSrc: string;
  locationLabel: string;
  subtitle: string;
  price: number;
  showNightLabel: boolean;
  disabled?: boolean;
  actionLabel?: string;
  heart: React.ReactNode;
  onNavigate: () => void;
  onActionClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
