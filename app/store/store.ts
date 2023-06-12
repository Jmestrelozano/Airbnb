import { create } from "zustand";

import { Store } from "../interfaces";

export const useStore = create<Store>((set) => ({
  isOpenRegisterModal: false,
  isOpenLoginModal: false,
  onOpenRegisterModal: () => set({ isOpenRegisterModal: true }),
  onCloseRegisterModal: () => set({ isOpenRegisterModal: false }),
  onOpenLoginModal: () => set({ isOpenLoginModal: true }),
  onCloseLoginModal: () => set({ isOpenLoginModal: false }),
}));
