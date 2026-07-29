"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { IoGlobeOutline } from "react-icons/io5";
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
      <div className="flex flex-row items-center gap-1 md:gap-2">
        <div
          onClick={onRent}
          className="
            hidden md:block
            text-sm font-semibold
            py-3 px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
            text-neutral-800
          "
        >
          Conviértete en anfitrión
        </div>
        <div
          className="
            hidden md:flex
            items-center justify-center
            p-3
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
            text-neutral-800
          "
          aria-label="Idioma y moneda"
        >
          <IoGlobeOutline size={18} />
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-1 pl-3
            border border-neutral-200
            flex flex-row items-center gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu size={16} className="text-neutral-800" />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.12)] w-[40vw] md:w-[240px] bg-white overflow-hidden right-0 top-14 text-sm border border-neutral-100">
          <div className="flex flex-col cursor-pointer py-2">
            {currentUser ? (
              <>
                <MenuItem
                  label="Viajes"
                  onClick={() => onNavigate("/trips")}
                />
                <MenuItem
                  label="Favoritos"
                  onClick={() => onNavigate("/favorites")}
                />
                <MenuItem
                  label="Reservas"
                  onClick={() => onNavigate("/reservations")}
                />
                <MenuItem
                  label="Propiedades"
                  onClick={() => onNavigate("/properties")}
                />
                <MenuItem
                  label="Pon tu espacio en Airbnb"
                  onClick={onOpenRentModal}
                />
                <hr className="my-1 border-neutral-200" />
                <MenuItem label="Cerrar sesión" onClick={onLogout} />
              </>
            ) : (
              <>
                <MenuItem onClick={onOpenLoginModal} label="Inicia sesión" />
                <MenuItem onClick={onOpenRegisterModal} label="Regístrate" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
