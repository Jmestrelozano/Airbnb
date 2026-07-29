"use client";

import { UserMenu } from "@/features/navigation/components/UserMenu";
import { useUserMenu } from "@/features/navigation/hooks/useUserMenu";
import { UserProps } from "@/shared/lib/types/global";

export const UserMenuView: React.FC<UserProps> = ({ currentUser }) => {
  const viewModel = useUserMenu({ currentUser });

  return <UserMenu {...viewModel} />;
};
