"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { useStore } from "@/shared/lib/store";
import { Store } from "@/shared/lib/types/store";
import { UserProps } from "@/shared/lib/types/global";

export const useUserMenu = ({ currentUser }: UserProps) => {
  const router = useRouter();
  const { onOpenRegisterModal, onOpenLoginModal, onOpenRentModal } = useStore(
    (store: Store) => store
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return onOpenLoginModal();
    }

    onOpenRentModal();
  }, [onOpenLoginModal, currentUser, onOpenRentModal]);

  return {
    currentUser,
    isOpen,
    toggleOpen,
    onRent,
    onOpenRentModal,
    onOpenLoginModal,
    onOpenRegisterModal,
    onNavigate: (path: string) => router.push(path),
    onLogout: signOut,
  };
};
