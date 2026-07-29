"use client";

import { RegisterModal } from "@/features/auth/components/RegisterModal";
import { useRegisterModal } from "@/features/auth/hooks/useRegisterModal";

export const RegisterModalView = () => {
  const viewModel = useRegisterModal();

  return <RegisterModal {...viewModel} />;
};
