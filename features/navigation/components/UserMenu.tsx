"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "@/shared/ui/Avatar";
import { MenuItem } from "@/features/navigation/components/MenuItem";
import { UserMenuProps } from "@/features/navigation/types/userMenu.interface";

export const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  isOpen,
  toggleOpen,
  onRent,
  onOpenRentModal,
  onOpenLoginModal,
  onOpenRegisterModal,
  onNavigate,
  onLogout,
}) => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => onNavigate("/trips")}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => onNavigate("/favorites")}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => onNavigate("/reservations")}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => onNavigate("/properties")}
                />
                <MenuItem label="Airbnb your home" onClick={onOpenRentModal} />
                <hr />
                <MenuItem label="Logout" onClick={onLogout} />
              </>
            ) : (
              <>
                <MenuItem onClick={onOpenLoginModal} label="Login" />
                <MenuItem onClick={onOpenRegisterModal} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
