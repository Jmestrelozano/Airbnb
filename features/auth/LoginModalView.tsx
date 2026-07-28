"use client";

import { LoginModal } from "@/features/auth/components/LoginModal";
import { useLoginModal } from "@/features/auth/hooks/useLoginModal";

export const LoginModalView = () => {
  const viewModel = useLoginModal();

  return <LoginModal {...viewModel} />;
};
