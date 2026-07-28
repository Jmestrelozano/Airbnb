import { TUser } from "@/shared/lib/types/global";

export interface UserMenuProps {
  currentUser?: TUser | null;
  isOpen: boolean;
  toggleOpen: () => void;
  onRent: () => void;
  onOpenRentModal: () => void;
  onOpenLoginModal: () => void;
  onOpenRegisterModal: () => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}
