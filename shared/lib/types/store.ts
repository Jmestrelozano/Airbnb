export interface Store {
  isOpenRegisterModal: boolean;
  isOpenLoginModal: boolean;
  isOpenRentModal: boolean;
  isOpenSearchModal: boolean;
  onOpenRegisterModal: () => void;
  onCloseRegisterModal: () => void;
  onOpenLoginModal: () => void;
  onCloseLoginModal: () => void;
  onOpenRentModal: () => void;
  onCloseRentModal: () => void;
  onOpenSearchModal: () => void;
  onCloseSearchModal: () => void;
}
