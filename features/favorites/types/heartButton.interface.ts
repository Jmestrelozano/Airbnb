import { TUser } from "@/shared/lib/types/global";

export interface HeartButtonProps {
  hasFavorited: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface HeartButtonViewProps {
  listingId: string;
  currentUser?: TUser;
}
