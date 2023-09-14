import { create } from "zustand";

import { Store } from "../interfaces";

export const useStore = create<Store>((set) => ({
  isOpenRegisterModal: false,
  isOpenLoginModal: false,
  isOpenRentModal: false,
  isOpenSearchModal: false,
  onOpenRegisterModal: () => set({ isOpenRegisterModal: true }),
  onCloseRegisterModal: () => set({ isOpenRegisterModal: false }),
  onOpenLoginModal: () => set({ isOpenLoginModal: true }),
  onCloseLoginModal: () => set({ isOpenLoginModal: false }),
  onOpenRentModal: () => set({ isOpenRentModal: true }),
  onCloseRentModal: () => set({ isOpenRentModal: false }),
  onOpenSearchModal: () => set({ isOpenSearchModal: true }),
  onCloseSearchModal: () => set({ isOpenSearchModal: false }),
}));
