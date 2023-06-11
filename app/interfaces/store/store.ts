export interface Store {
  isOpenRegisterModal: boolean;
  isOpenLoginModal: boolean;
  onOpenRegisterModal: () => void;
  onCloseRegisterModal: () => void;
  onOpenLoginModal: () => void;
  onCloseLoginModal: () => void;
}
