"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { Avatar } from "../avatars/Avatar";
import { MenuItem } from "./MenuItem";

import { useStore } from "@/app/store/store";

import { Store, UserProps } from "@/app/interfaces";

export const UserMenu: React.FC<UserProps> = ({ currentUser }) => {
  const router = useRouter();
  const { onOpenRegisterModal, onOpenLoginModal, onOpenRentModal } = useStore(
    (store: Store) => store
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return onOpenLoginModal();
    }

    onOpenRentModal();
  }, [onOpenLoginModal, currentUser, onOpenRentModal]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push("/properties")}
                />
                <MenuItem label="Airbnb your home" onClick={onOpenRentModal} />
                <hr />
                <MenuItem label="Logout" onClick={signOut} />
              </>
            ) : (
              <>
                <MenuItem onClick={onOpenLoginModal} label={"Login"} />

                <MenuItem onClick={onOpenRegisterModal} label={"Sign up"} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
