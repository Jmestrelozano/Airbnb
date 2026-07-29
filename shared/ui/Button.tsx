"use client";

import { ButtonProps } from "@/shared/ui/types/button";

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        transition
        w-full
        ${outline ? "bg-white border-black text-black hover:opacity-80" : "bg-airbnb border-airbnb text-white hover:bg-airbnb-hover"}
        ${small ? "text-sm py-1 font-light border-[1px]" : "text-md py-3 font-semibold border-2"}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
  );
};
