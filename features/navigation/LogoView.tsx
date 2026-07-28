"use client";

import { Logo } from "@/features/navigation/components/Logo";
import { useLogo } from "@/features/navigation/hooks/useLogo";

export const LogoView = () => {
  const { onClick } = useLogo();

  return <Logo onClick={onClick} />;
};
