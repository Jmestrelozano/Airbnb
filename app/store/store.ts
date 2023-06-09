import { create } from "zustand";

import { Store } from "../interfaces";

export const useStore = create<Store>((set) => ({
  isOpenRegisterModal: false,
  onOpenRegisterModal: () => set({ isOpenRegisterModal: true }),
  onCloseRegisterModal: () => set({ isOpenRegisterModal: false }),
}));
